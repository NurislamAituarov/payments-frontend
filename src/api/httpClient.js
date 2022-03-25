export async function postPayments(body) {
  return await fetch('/payments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((response) => response.json());
}
