const BASE_URL = 'http://localhost:9999/api';

// use in a browse page
export async function getListings() {
  const res = await fetch(`${BASE_URL}/listings`);
  return res.json();
}
// get one listing with id
export async function getListing(id) {
  const res = await fetch(`${BASE_URL}/listings/${id}`);
  return res.json();
}
//active listings for homepage
export async function getActiveListings() {
  const res = await fetch(`${BASE_URL}/active-listings`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Something went wrong');
  }
  return res.json();
}
// listings from specific user 
export async function getUserListings(seller_id) {
  const res = await fetch(`${BASE_URL}/listings/seller/${seller_id}`);
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

export async function createListing(data) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/listings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
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
export async function uploadImage(listingId, imageFile) {
  const formData = new FormData()
  formData.append('image', imageFile)
  console.log('uploading image for listing:', listingId)
  const res = await fetch(`${BASE_URL}/listings/${listingId}/images`, {
    method: 'POST',
    body: formData
  })
  return res.json()
}