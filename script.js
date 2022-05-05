const header = document.querySelector('header');
const main = document.querySelector('main');
const carousel = document.querySelector('section .carousel');
const manualBtns = carousel.querySelectorAll('.carousel-manually ul li');
const articleContainer = document.querySelector('.article-container');
const paginationBtns = document.querySelectorAll('.pagination ul li');
const prevBtn = document.querySelector('.pagination ul li.left');
const nextBtn = document.querySelector('.pagination ul li.right');
//ScollHandler
function scrollHandler() {
  let num = 100;
  //PikaChu Transform
  const blockPage = document.querySelector('.block');
  function PikaChuHandler() {
    if (num <= 100 && num >= 0) {
      blockPage.style.setProperty(
        'transform',
        `translateY(${num - scrollY * 0.15}%)`
      );
    }
  }
  //SideBar
  const sidebar = document.querySelector('.sidebar');
  const headerHeight = header.getBoundingClientRect().height;
  function sideBarHandler() {
    if (scrollY > headerHeight / 2) {
      sidebar.classList.add('show');
    } else {
      sidebar.classList.remove('show');
    }
  }
  sideBarHandler();
  PikaChuHandler();
}
//Carousel
function CarouselHandler() {
  let slide = 0;
  const carouselImgs = carousel.querySelectorAll('.img img');
  function carouselSlideNext() {
    slide++;
    if (slide > carouselImgs.length - 1) {
      slide = 0;
    }
    transformCarousel();
  }
  function carouselSlidePrev() {
    slide--;
    if (slide < 0) {
      slide = carouselImgs.length - 1;
    }
    transformCarousel();
  }
  function transformCarousel() {
    carouselImgs.forEach(img => {
      img.style.setProperty('transform', `translateX(${slide * -100}%)`);
    });
    carousel.querySelector('ul li.select').classList.remove('select');
    manualBtns[slide].classList.add('select');
  }
  setInterval(carouselSlideNext, 5000);
  carousel.querySelectorAll('.bx').forEach(btn => {
    btn.addEventListener('click', e => {
      if (e.target.classList.contains('right-btn')) {
        carouselSlideNext();
      }
      if (e.target.classList.contains('left-btn')) {
        carouselSlidePrev();
      }
    });
  });
  manualBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      slide = i;
      carousel.querySelector('ul li.select').classList.remove('select');
      btn.classList.add('select');
      transformCarousel();
    });
  });
}
const articles = [
  {
    src: './articles/paths.html',
    img: './css/img/me.jpg',
    title: 'The Paths I walked through',
    body: '&emsp; In article, I want to share about my paths and my thoughts, why I chose this path as my final path.<br> I want to share my education first.<br/> In high school. I studied in Food and Beverage department. <br/> I thought if I had a skill, it would help me get the job easier. It’s true. <br/> When I was looking for a part-time, the restaurant they hired me because I had some related and fundamental knowledge on food. Therefore, they offered me the job, which let me earn my allowance. So, I used to be a waiter, assistant of chef, or bartender. As you know, I have worked in food industry for over 2 years, which let me learn lots of experience. (What I learn from my previous jobs, I write down on another post.) Then, I started to wonder that do I choose chef as my career job. I was 19. I was young. I haven’t finished to travel and explore this world. I still desired to learn a lot, to touch something that I haven’t seen, so I left the restaurant.<br/> In college, I chose the English department as my major. I considered that English is a global language. If I learn it well, it will help me a lot, on business and future. The beginning of period, it’s hard, because my basics is not well, and Professor is lecturing with English without Chinese. I realize if I don’t spend more time to chase them, I will be left behind. The distance will be longer. When I have progress, they also have progress, so the distance is not easy to be shorter. I have to chase and spend more and more time for filling the gap. <br/> When I became a junior in college, I started to think that what do I want to do in the future? I pretty understand I don’t want to be an English teacher, or a translator. I think it’s not suitable for me. If I do, I will live with unhappiness. So, I start to explore and try everything that I’m curious. Accidently, I touch the programming language. I found this is so interesting, so I start to learn such as HTML, CSS, JavaScript, start with Front-End language. This also let me understand the programmer is a job I want to work with for my life. <br/> At the end, I want to say, even the path is not straight, but if the destination is same, how about walk a little longer, those paths bring me precious and meaningful memories.',
  },
  {
    src: './articles/self-learning.html',
    img: './css/img/self-learn.jpg',
    title: 'The thing of "Self-learning"',
    body: '&emsp; It’s a tough road I walk on. Everything I learn by myself. The only method of self-learning is searching every resource that I can find to solve my problems. Sometimes, the problem it’s not easy as I seen, it is also related to the fundamental knowledge, so I spent more time to fix this problem, such as Programming which I have to spent time to learn Cyber Security, Data Structure and Algorithm, and more for let me become a better programmer. Therefore, for solving all problem that I have to step by step, calm down, and grow up.I’m glad I’m born with high technology. Let me have chance for using google to solve my problems. Sometime, Google will response me the numerous different answers and logics, because a problem has thousands answers that can solve it. As what we heard ”All roads lead to Rome”, there’s not only a solution. Therefore, we have to read every answer and analyze it to find the better and newest one. Then, another problem come out, if I turn off google, can I still solve the problem after I search the google? Probably I can, or not. So, I think training is important, times by times. When I decide to become a programmer, this road can’t turn back. I have to step forward to finish the goals that I set, and become stronger and more powerful than yesterday. ',
  },
  {
    src: './articles/job.html',
    img: './css/img/IMG_3427.JPG',
    title: 'What I learned from my previous jobs',
    body: '&emsp; Before you read this article, I recommend you can read “The Paths what I walked through” first. You will know more about my background. <br/>Let’s GO!<br/>My first job was an intern in “Mitsui Food”. The reason how I get in this company, because my high school had cooperated with this company. Therefore, when I was senior in high school, I started to work at this restaurant until I graduated. In restaurant, I was responsible for table service and preparing the food. Most customers are very rich, because the price of food was not cheap. The cheaper one which cost me about five hundreds. So, managers they care about our attitude and service. I thought what I learned from this job was soft power. It trained me that how to communicate with customer, and handle the emergency. After a year, I considered about my career, so I decided to left from this company to get in the college.  <br/>In college, I still work my way through college. The first job I get which is a drinks shop, I’m responsible for making the drinks, and checking. The job isn’t hard, but it’s very busy. Therefore, the teamwork and communication are important. Everyone has their work. We have to finish our work first, then support other. In time, we trust everyone’s ability. Because of trusts that we can work fluidly.<br/>The next job I get which is a part-time job, work in FJCU university. The department is part of Academic Affairs Office. I’m responsible for assisting in organizing the activities and lectures to make sure every detail greatly. I’m also using Office tools for finishing my job, which is classifying the files. I learn a lot from this job. In activity, I can get some ideas or concepts from HR. They share their experience or story with us. Therefore, I can find my lacks of ability, and improve it.<br/>As you read, I have done many jobs. Do I regret my experience? I think the answer is no. I am who I am because of these experiences.',
  },
  {
    src: './articles/froggy.html',
    img: './css/img/froggy.jpeg',
    title: 'A Youtuber "Froggy Chiu"',
    body: '&emsp; He is one of famous Youtuber I think, but he must be my favorite one. He has a channel, which is NSFW(Not Save For Work). I like his personality and attitude on living in this world. <br/> He said “if there’s something you are interested, just do it. The price of restarting is not terrible as you think”. It sounds very irresponsible. But I think life has once and we can’t let time to be returned, how about to be brave choose a life what we want to live. This is how I admire him. Froggy Chiu used to be a supervisor of marketing with a high salary, but now he’s selling the house for creating the channel as a job. He sacrifices the high-pay for getting a life that he like to live, which is very brave. This also inspires me. I don’t have to be afraid too much. I’m still young. I can challenge anything that I never try. ',
  },
  {
    src: './articles/cat.html',
    img: './css/img/cat.JPG',
    title: 'My Cat "Moon"',
    body: '&emsp; I have a cat. Her name is “Moon”. One day, my friend he called me, he saw a kitten was trapped in a tire, and asks me to help. She was meowing loudly for a while. We didn’t see her parents around, so I take her to home. I remember the first time I saw her. She was very small. Her age was between a month and two months. Then, she became my responsibility. I became her father. <br>Few days past, I started to realize that raising a kid would drive me crazy, and I also understand how exhausting was when my parents were raising me. I spent my whole day to take care my cat. For instance, I had to play with her, feed her, and watch her. Especially, she was meowing loudly. My ears hurt. Days by days, I found I can understand the cat’s language. The sounds of meowing had different rhythms, which was very helpful for me. I can know she was hungry or angry, or maybe I was crazy. Another problem let me have headache, which was picky eater. If the feed smell like not yummy, she would not eat all the day. Therefore, I spent long time on looking for a feed that she like. <br>After a year, she’s gradually growing up. She’s not often on meowing, and more mature than before as an adult. Nowadays, I think she is a happy cat and living with comfortable life. She doesn’t have to wander on street',
  },
  {
    src: './articles/thought.html',
    img: './css/img/IMG_5007.png',
    title: '"My Thought" after finish this website"',
    body: '&emsp; Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum id iste minus in animi saepe atque porro veritatis placeat dolor. Quas ad sit aliquam doloribus officia culpa quo porro nesciunt ullam laborum autem delectus ea perspiciatis explicabo ducimus id, maxime aperiam distinctio ipsum labore asperiores sapiente voluptatibus repellat quam? Molestiae sit, perferendis a omnis corrupti qui doloribus consequatur at ullam expedita, eaque, molestias esse exercitationem quae hic quo? Consequuntur, minima veritatis est architecto necessitatibus obcaecati sed quidem molestias saepe nesciunt repellat nam et quasi dolorem recusandae deleniti ratione soluta vero consequatur, ea at facilis, cumque numquam. Ratione, facere. Nam, obcaecati?',
  },
];
//Pagination
function PaginationHandler() {
  let currentPage = 1;
  let ItemInEachPage = 5;
  let totalPage = Math.ceil(articles.length / ItemInEachPage); //2

  function pageChange(page) {
    page == 1
      ? prevBtn.classList.add('hide')
      : prevBtn.classList.remove('hide');
    page == totalPage
      ? nextBtn.classList.add('hide')
      : nextBtn.classList.remove('hide');

    let eachPage = articles.slice(
      (page - 1) * ItemInEachPage,
      page * ItemInEachPage
    );
    articleContainer.innerHTML = '';
    eachPage.forEach(article => {
      let item = `<article>
    <a href="${article.src}">
      <div class="img">
        <img src="${article.img}" />
      </div>
      <div class="content">
        <h2>${article.title}</h2>
        <p>
          ${article.body}
        </p>
      </div>
    </a>
  </article>`;
      articleContainer.innerHTML += item;
    });
    //Slice Paragraph
    const paragraphs = document.querySelectorAll('article p');
    paragraphs.forEach(p => {
      const newParagraph = p.textContent.split(' ');
      if (newParagraph.length > 50) {
        newParagraph.splice(50);
        p.textContent = newParagraph.join(' ') + '......... More';
      }
    });
  }
  paginationBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      if (e.target.classList.contains('left')) {
        currentPage--;
        if (currentPage < 1) currentPage = 1;
        pageChange(currentPage);
      }
      if (e.target.classList.contains('right')) {
        currentPage++;
        if (currentPage > totalPage) currentPage = totalPage;
        pageChange(currentPage);
      }
      if (e.target.classList.contains('page')) {
        currentPage = e.target.textContent;
        pageChange(currentPage);
      }
      document.querySelector('li.active').classList.remove('active');
      paginationBtns[currentPage].classList.add('active');
    });
  });
  pageChange(1);
}
CarouselHandler();
PaginationHandler();
window.addEventListener('scroll', scrollHandler);
