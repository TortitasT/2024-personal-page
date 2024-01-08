export { TestTransition }

function TestTransition() {
  function navigateTo(path) {
    if (!document.startViewTransition) {
      window.location.href = path
      return
    }
    document.startViewTransition(() => {
      window.location.href = path
    })
  }

  return <button onClick={() => navigateTo('/blog')}>TestTransition</button>
}
