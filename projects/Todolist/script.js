const input = document.querySelector('.input-text');
const ul = document.querySelector('main ul');
const filterBtns = document.querySelectorAll('.filter li');

const list = JSON.parse(localStorage.getItem('list')) || [];
function addItemToStorage(e) {
  if (e.keyCode !== 13) return;
  let item = {
    item: input.value,
    status: 'Pending',
  };
  list.push(item);
  localStorage.setItem('list', JSON.stringify(list));
  input.value = '';
  render();
}

function render() {
  let liArray = [];
  for (let i = 0; i < list.length; i++) {
    let item = `<li id=${i}>
    <div class="todo" >
      <input type="checkbox"  id="todo-${i}" ${
      list[i].status == 'Done' ? 'checked' : ''
    } />
      <label for="todo-${i}" class="${
      list[i].status == 'Done' ? 'checked' : ''
    }" > ${list[i].item}</label>
    </div>
    <div class="buttons">
      <i class="bx bxs-edit"></i>
      <i class="bx bx-trash"></i>
    </div>
  </li>`;
    liArray.push(item);
  }
  ul.innerHTML = liArray.join('');

  //CheckBox Events
  const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
  checkBoxes.forEach(box => {
    box.addEventListener('click', toggleDone);
  });

  //Buttons Events
  const buttons = document.querySelectorAll('i.bx');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', e => {
      let index = e.target.parentNode.parentNode.getAttribute('id');
      if (buttons[i].classList.contains('bxs-edit')) {
        editHandler(index);
      }
      if (buttons[i].classList.contains('bx-trash')) {
        deleteHandler(index);
      }
    });
  }
  document.querySelector('.filter li.active').classList.remove('active');
  document.querySelector('.filter li.all').classList.add('active');
  let pendingLength = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i].status == 'Pending') {
      pendingLength++;
    }
  }
  document.querySelector('footer span').textContent = pendingLength;
}
function editHandler(index) {
  const labels = document.querySelectorAll('label');
  const li = Array.from(document.querySelectorAll('main li'));

  //Edit Input
  li[
    index
  ].innerHTML = `<input type="text" class="edit" value="${labels[index].textContent}" >
  <div class="buttons">
  <i class="bx bx-check"></i>
  <i class="bx bx-trash"></i>
</div>`;
  //Edit Done Event
  const editInput = document.querySelector('input.edit');
  document.querySelector('.bx-check').addEventListener('click', () => {
    li[index].innerHTML = `
    <div class="todo" >
      <input type="checkbox"  id="todo-${index}" />
      <label for="todo-${index}"> ${editInput.value}</label>
    </div>
    <div class="buttons">
    <i class="bx bxs-edit"></i>
    <i class="bx bx-trash"></i>
  </div>`;

    list[index] = {
      item: editInput.value,
      status: 'Pending',
    };
    localStorage.setItem('list', JSON.stringify(list));
    render();
  });
}
function deleteHandler(index) {
  list.splice(index, 1);
  localStorage.setItem('list', JSON.stringify(list));
  render();
}
function toggleDone() {
  const index = this.parentNode.parentNode.getAttribute('id');
  if (list[index].status == 'Pending') {
    list[index].status = 'Done';
    localStorage.setItem('list', JSON.stringify(list));
  } else {
    list[index].status = 'Pending';
    localStorage.setItem('list', JSON.stringify(list));
  }
  render();
}
function filterHandler(e) {
  document.querySelector('.filter li.active').classList.remove('active');
  e.target.classList.add('active');
  const value = e.target.textContent;

  if (value == 'All') return render();
  const filterList = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].status == value) {
      let item = `<li id=${i}>
      <div class="todo" >
        <input type="checkbox"  id="todo-${i}" ${
        list[i].status == 'Done' ? 'checked' : ''
      } />
        <label for="todo-${i}" class="${
        list[i].status == 'Done' ? 'checked' : ''
      }" > ${list[i].item}</label>
      </div>
      <div class="buttons">
        <i class="bx bxs-edit"></i>
        <i class="bx bx-trash"></i>
      </div>
    </li>`;
      filterList.push(item);
    }
  }
  ul.innerHTML = filterList.join('');
  //CheckBox Events
  const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
  checkBoxes.forEach(box => {
    box.addEventListener('click', toggleDone);
  });

  //Buttons Events
  const buttons = document.querySelectorAll('i.bx');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', e => {
      let index = e.target.parentNode.parentNode.getAttribute('id');
      if (buttons[i].classList.contains('bxs-edit')) {
        editHandler(index);
      }
      if (buttons[i].classList.contains('bx-trash')) {
        deleteHandler(index);
      }
    });
  }
}

render();

input.addEventListener('keyup', addItemToStorage);
filterBtns.forEach(btn => {
  btn.addEventListener('click', filterHandler);
});
