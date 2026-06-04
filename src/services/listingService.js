const BASE_URL = 'http://localhost:9999/api';

/* AI used for guidance on structuring JWT Authorization headers for frontend API requests. */
function getAuthHeaders() {
  const token = localStorage.getItem('token');

  return {
    Authorization: `Bearer ${token}`
  };
}
function getJsonAuthHeaders() {
  return {
    'Content-Type': 'application/json', ...getAuthHeaders()
  };
}
/*end of AI guidance */
// use in a browse page
export async function getListings() {
  const res = await fetch(`${BASE_URL}/listings`, {headers: getAuthHeaders() });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || errorData.message || 'Something went wrong');
  }
  return res.json();
}
// get one listing with id
export async function getListing(id) {
  const res = await fetch(`${BASE_URL}/listings/${id}`, {headers: getAuthHeaders()});
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || errorData.message || 'Something went wrong');
  }
  return res.json();
}
//active listings for homepage
export async function getActiveListings() {
  const res = await fetch(`${BASE_URL}/active-listings`, { headers: getAuthHeaders()});
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Something went wrong');
  }
  return res.json();
}
// active listings from specific user 
export async function getSellerListings(seller_id) {
  const res = await fetch(`${BASE_URL}/listings/seller/${seller_id}`, { headers: getAuthHeaders()});
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Something went wrong');
  }
  return res.json();
}

export async function getUserListings(seller_id) {
  const res = await fetch(`${BASE_URL}/listings/user/${seller_id}`, { headers: getAuthHeaders()});
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Something went wrong');
  }
  return res.json();
}

export async function searchListings(query) {
  const res = await fetch(`${BASE_URL}/search/?term=${query}`, { headers: getAuthHeaders()});
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Something went wrong');
  }
  return res.json();
}

export async function createListing(data) {
  const res = await fetch(`${BASE_URL}/listings`, {
    method: 'POST',
    headers: getJsonAuthHeaders(),
    body: JSON.stringify(data),
  });
   if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || errorData.message || 'Something went wrong');
  }
  return res.json();
}

export async function markAsSold(id) {
  const res = await fetch(`${BASE_URL}/listings/${id}/sold`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  });
   if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || errorData.message || 'Something went wrong');
  }
  return res.json();
}

export async function deleteListing(id) {
  const res = await fetch(`${BASE_URL}/listings/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
   if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || errorData.message || 'Something went wrong');
  }
  return res.json();
}

export async function uploadImage(listingId, imageFile) {
  const formData = new FormData()
  formData.append('image', imageFile)
  console.log('uploading image for listing:', listingId)
  const res = await fetch(`${BASE_URL}/listings/${listingId}/images`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData
  })
   if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || errorData.message || 'Something went wrong');
  }
  return res.json()
}