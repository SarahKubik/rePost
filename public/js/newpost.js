async function newFormHandler(event) {
  event.preventDefault();

  const content = document.querySelector('.textarea').value.trim();

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#post-form').addEventListener('submit', newFormHandler);