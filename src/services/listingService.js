const BASE_URL = 'http://localhost:9999/api';

// use in a browse page
export async function getListings() {
  const res = await fetch(`${BASE_URL}/listings`);
  return res.json();
}

export async function getActiveListings() {
  const res = await fetch(`${BASE_URL}/listings/find/active`);
  return res.json();
}

export async function getListing(id) {
  const res = await fetch(`${BASE_URL}/listings/${id}`);
  return res.json();
}

export async function createListing(data) {
  const res = await fetch(`${BASE_URL}/listings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function markAsSold(id) {
  const res = await fetch(`${BASE_URL}/listings/${id}/sold`, {
    method: 'PATCH',
  });
  return res.json();
}

export async function deleteListing(id) {
  const res = await fetch(`${BASE_URL}/listings/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}