export const bindCodeInput = (refs, state, renderAll) => {
  if (!refs.codeInput) return;
  refs.codeInput.value = state.code;
  refs.codeInput.addEventListener('input', (event) => {
    state.code = event.target.value;
    renderAll(refs, state);
  });
};
