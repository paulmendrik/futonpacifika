const paintings = document.querySelectorAll('.painting')

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active')
        }
            else {
                entry.target.classList.remove('active')
            }
        
    })
},
   { threshold: 0.5
   });
//
  for (let i = 0; i < paintings.length; i++) {
   const elements = paintings[i];

    observer.observe(elements);
  } 