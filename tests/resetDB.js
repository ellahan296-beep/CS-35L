


export async function resetDatabase() {
  await fetch('http://localhost:9999/test/reset', { method: 'POST' });
}


