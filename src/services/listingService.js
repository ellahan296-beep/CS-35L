const BASE_URL = 'http://localhost:9999/api';

// use in a browse page
export async function getListings() {
  const res = await fetch(`${BASE_URL}/listings`);
  return res.json();
}

export async function getActiveListings() {
  const res = await fetch(`${BASE_URL}/active-listings`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Something went wrong');
  }
  return res.json();
}

export async function searchListings(query) {
  const res = await fetch(`${BASE_URL}/search/?term=${query}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Something went wrong');
  }
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