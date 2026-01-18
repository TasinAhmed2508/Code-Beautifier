export const bindNavbarMorph = () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('is-floating');
    } else {
      navbar.classList.remove('is-floating');
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
};
