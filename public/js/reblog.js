async function newFormHandler(event) {
  event.preventDefault();

  console.log(`
  
  Sumbitted
  
  `);

  const content = document.querySelector('.textarea').value.trim();
  const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  // console.log(`
  
  
  
  // ${post_id}
  
  // `)

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      content: content,
      post_id: post_id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#post-form').addEventListener('submit', newFormHandler);