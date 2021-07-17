var quill = new Quill('#editor', {
  theme: 'snow'
});

async function newFormHandler(event) {
  event.preventDefault();

  let content = quill.getText().trim();

  if (content == "") {
    alert("Post cannot be empty")
    return;
  } else {
    content = quill.root.innerHTML;
  }

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
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#post-quill').addEventListener('click', newFormHandler);