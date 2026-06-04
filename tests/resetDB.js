


export async function resetDatabase() {
  await fetch('http://localhost:9999/test/reset', { method: 'POST' });
}

export async function resetListings() {
  await fetch('http://localhost:9999/test/reset/listings', { method: 'POST' });
}


