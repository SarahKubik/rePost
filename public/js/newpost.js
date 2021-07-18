var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons

  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  ['link', 'video'],
  ['clean']                                         // remove formatting button
];

var quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow',
  placeholder: 'Penny for your thoughts...'
});

async function newFormHandler(event) {
  event.preventDefault();

  let content = quill.getContents().ops;

  if (content.length == 1 && content[0].insert.trim() == "") {
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
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#post-quill').addEventListener('click', newFormHandler);