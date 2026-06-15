import { useEffect, useMemo, useRef, useState } from 'react';
import EmptyState from './components/EmptyState';
import Filters from './components/Filters';
import ListingCard, { ListingHeader, MobileListingCard } from './components/ListingCard';
import ListingDetail from './components/ListingDetail';
import ListingFormModal from './components/ListingFormModal';
import SearchAndActions from './components/SearchAndActions';
import Sidebar from './components/Sidebar';
import { downloadListingsExcel, downloadPrintExcel } from './utils/exportExcel';
import { exportBackup, loadListings, readBackupFile, saveListings } from './utils/storage';

const defaultFilters = {
  status: '',
  province: '',
  region: '',
  floor: '',
  area: '',
  manager: '',
};

export default function App() {
  const [listings, setListings] = useState(() => loadListings());
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('전체');
  const [filters, setFilters] = useState(defaultFilters);
  const [editingListing, setEditingListing] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const restoreInputRef = useRef(null);

  useEffect(() => {
    saveListings(listings);
  }, [listings]);

  const managers = useMemo(
    () => [...new Set(listings.map((listing) => listing.manager).filter(Boolean))],
    [listings],
  );

  const floors = useMemo(
    () => [...new Set(listings.map((listing) => listing.floor).filter(Boolean))],
    [listings],
  );

  const filteredListings = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return listings
      .filter((listing) => {
      if (activeTab !== '전체' && listing.type !== activeTab) return false;
      if (filters.status && listing.status !== filters.status) return false;
      if (filters.province && listing.province !== filters.province) return false;
      if (filters.region && listing.region !== filters.region) return false;
      if (filters.floor && listing.floor !== filters.floor) return false;
      if (filters.manager && listing.manager !== filters.manager) return false;
      if (filters.area && !matchesArea(Number(listing.area || 0), filters.area)) return false;
      if (!normalizedSearch) return true;

      return [
        listing.businessName,
        listing.address,
        listing.detailLocation,
        listing.manager,
        listing.memo,
        listing.specialNote,
        listing.tenantConditions,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearch));
      })
      .sort((a, b) => new Date(b.createdAt || b.updatedAt || 0) - new Date(a.createdAt || a.updatedAt || 0));
  }, [activeTab, filters, listings, search]);

  const rentListings = useMemo(() => filteredListings.filter((listing) => listing.type === '임대'), [filteredListings]);
  const saleListings = useMemo(() => filteredListings.filter((listing) => listing.type === '매매'), [filteredListings]);

  function openCreateForm() {
    setEditingListing(null);
    setIsFormOpen(true);
  }

  function openEditForm(listing) {
    setEditingListing(listing);
    setSelectedListing(null);
    setIsFormOpen(true);
  }

  function goHome() {
    setSearch('');
    setActiveTab('전체');
    setFilters(defaultFilters);
    setSelectedListing(null);
    setEditingListing(null);
    setIsFormOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSubmit(form) {
    const now = new Date().toISOString();
    if (form.id) {
      setListings((prev) =>
        prev.map((listing) => (listing.id === form.id ? { ...listing, ...form, updatedAt: now } : listing)),
      );
    } else {
      setListings((prev) => [
        { ...form, id: crypto.randomUUID(), createdAt: now, updatedAt: now },
        ...prev,
      ]);
    }
    setIsFormOpen(false);
    setEditingListing(null);
  }

  function handleDelete(id) {
    if (!confirm('이 매물을 삭제할까요?')) return;
    setListings((prev) => prev.filter((listing) => listing.id !== id));
    setSelectedListing((prev) => (prev?.id === id ? null : prev));
  }

  function handleCopy(listing) {
    const now = new Date().toISOString();
    setListings((prev) => [
      {
        ...listing,
        id: crypto.randomUUID(),
        businessName: `${listing.businessName || '매물'} 복사본`,
        status: '진행중',
        createdAt: now,
        updatedAt: now,
      },
      ...prev,
    ]);
  }

  async function handleRestore(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const restored = await readBackupFile(file);
      if (!confirm(`백업 파일의 ${restored.length}개 매물로 복원할까요? 현재 목록은 교체됩니다.`)) return;
      setListings(restored);
      setSearch('');
      setActiveTab('전체');
      setFilters(defaultFilters);
    } catch (error) {
      alert(error.message);
    } finally {
      event.target.value = '';
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      <Sidebar totalCount={listings.length} onHome={goHome} />

      <main className="lg:pl-72">
        <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-5 lg:px-8">
          <header className="mb-4 flex flex-col gap-1 sm:mb-6 sm:gap-2">
            <p className="text-xs font-semibold text-[#a67d2b] sm:text-sm">Listing Dashboard</p>
            <button
              type="button"
              onClick={goHome}
              className="w-fit text-left text-2xl font-bold tracking-normal text-slate-950 transition hover:text-[#9a762b] sm:text-3xl"
              title="홈으로 돌아가기"
            >
              상가 매물관리 마스터
            </button>
            <p className="hidden text-sm text-slate-500 sm:block">
              등록, 검색, 필터, 엑셀 다운로드, 백업과 복원을 한 화면에서 관리합니다.
            </p>
          </header>

          <div className="space-y-4">
            <SearchAndActions
              search={search}
              onSearchChange={setSearch}
              onCreate={openCreateForm}
              onExcel={() => downloadListingsExcel(filteredListings)}
              onPrintExcel={() => downloadPrintExcel(filteredListings)}
              onBackup={() => exportBackup(listings)}
              onRestoreClick={() => restoreInputRef.current?.click()}
            />

            <input
              ref={restoreInputRef}
              type="file"
              accept="application/json"
              onChange={handleRestore}
              className="hidden"
            />

            <Filters
              activeTab={activeTab}
              filters={filters}
              managers={managers}
              floors={floors}
              onTabChange={setActiveTab}
              onFilterChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
              onReset={goHome}
            />

            <section>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-600">
                  총 <span className="text-[#9a762b]">{filteredListings.length}</span>개 매물
                </p>
              </div>

              {filteredListings.length ? (
                <>
                  <div className="hidden overflow-x-auto pb-2 lg:block">
                    {activeTab === '전체' ? (
                      <div className="space-y-5">
                        <ListingTable
                          title="임대 목록"
                          mode="임대"
                          listings={rentListings}
                          onView={setSelectedListing}
                          onEdit={openEditForm}
                          onDelete={handleDelete}
                          onCopy={handleCopy}
                        />
                        <ListingTable
                          title="매매 목록"
                          mode="매매"
                          listings={saleListings}
                          onView={setSelectedListing}
                          onEdit={openEditForm}
                          onDelete={handleDelete}
                          onCopy={handleCopy}
                        />
                      </div>
                    ) : (
                      <ListingTable
                        mode={activeTab}
                        listings={filteredListings}
                        onView={setSelectedListing}
                        onEdit={openEditForm}
                        onDelete={handleDelete}
                        onCopy={handleCopy}
                      />
                    )}
                  </div>
                  <div className="grid gap-3 lg:hidden">
                    {filteredListings.map((listing) => (
                      <MobileListingCard
                        key={listing.id}
                        listing={listing}
                        onView={setSelectedListing}
                        onEdit={openEditForm}
                        onDelete={handleDelete}
                        onCopy={handleCopy}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <EmptyState />
              )}
            </section>
          </div>
        </div>
      </main>

      {isFormOpen ? (
        <ListingFormModal listing={editingListing} onClose={() => setIsFormOpen(false)} onSubmit={handleSubmit} />
      ) : null}

      <ListingDetail
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
        onEdit={openEditForm}
        onDelete={handleDelete}
      />
    </div>
  );
}

function matchesArea(area, filter) {
  if (filter === '10평 이하') return area <= 10;
  if (filter === '10-30평') return area > 10 && area <= 30;
  if (filter === '30-50평') return area > 30 && area <= 50;
  if (filter === '50평 이상') return area >= 50;
  return true;
}

function ListingTable({ title, mode, listings, onView, onEdit, onDelete, onCopy }) {
  if (!listings.length) return null;

  return (
    <div>
      {title ? <h3 className="mb-2 text-sm font-bold text-slate-700">{title}</h3> : null}
      <div className="space-y-2">
        <ListingHeader mode={mode} />
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
            onCopy={onCopy}
          />
        ))}
      </div>
    </div>
  );
}
