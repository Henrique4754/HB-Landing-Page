const cards = document.querySelectorAll(".imgcard"); //animação dos imgcards na linha 65, 66 e 67 da pasta home, arq index.html

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 15;
    const rotateY = ((x - centerX) / centerX) * -15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `rotateX(0) rotateY(0)`;
  });
});
3;
