const categoryLinks = document.querySelectorAll('.category-link');
const galleryItems  = document.querySelectorAll('.gallery-item');
const lightbox      = document.getElementById('lightbox');
const lbImg         = document.getElementById('lb-img');
const lbCounter     = document.getElementById('counter');
const lbClose       = document.getElementById('close');
const lbPrev        = document.getElementById('prev');
const lbNext        = document.getElementById('next');

let currentFilter  = 'all';
let visibleItems   = [];
let currentIndex   = 0;

//build the visible list based on current filter
function buildVisible() {
    visibleItems = Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
}

//Filter
categoryLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        currentFilter = link.dataset.filter;    
        categoryLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        galleryItems.forEach(item => {
            const cat = item.dataset.category;
            if (currentFilter === 'all' || cat === currentFilter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
        buildVisible();

    });
});

//Open lightbox
galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
        buildVisible();
        currentIndex = visibleItems.indexOf(item);
        showImage(currentIndex);
        lightbox.classList.add('open');
    });
});

function showImage(index) {
    const img = visibleItems[index].querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCounter.textContent = `${index + 1} / ${visibleItems.length}`;
    currentIndex = index;
}

//Prev / Next
lbPrev.addEventListener('click', () => {
        showImage((currentIndex - 1 + visibleItems.length) % visibleItems.length);
    }
);
lbNext.addEventListener('click', () => {

        showImage((currentIndex + 1) % visibleItems.length);
    }
);
//close
lbClose.addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{
if(e.target==lightbox)
    closeLightbox( );
});
function closeLightbox(){
    lightbox.classList.remove('open');
    lbImg.src='';

}
//keyboard navigation
document.addEventListener('keydown',e=>{
if(!lightbox.classList.contains('open'))
    return;
if(e.key=='ArrowLeft')
    lbPrev.click();
if(e.key=='ArrowRight')
    lbNext.click();
if(e.key=='Escape')
    closeLightbox();
});
//init
buildVisible();

