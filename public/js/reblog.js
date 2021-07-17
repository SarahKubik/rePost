var quill = new Quill('#editor', {
  theme: 'snow',
  placeholder: 'Add your thoughts or rePOST...'
});

async function newFormHandler(event) {
  event.preventDefault();

  let content = quill.getText().trim();

  console.log(content)
  console.log(typeof(content))
  console.log(content.length)

  if (content == "") {
    content = null;
  } else {
    content = quill.root.innerHTML;
  }

  console.log(content)
  const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

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

document.querySelector('#submit-quill').addEventListener('click', newFormHandler);