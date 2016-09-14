import _ from 'lodash'

const raf =  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame

const caf = window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame

export function maintainContext(container, callback, node) {
  console.log('maintainContext')
  // Maintain context around node if specified,
  // otherwise first visible child.
  node = node || getFirstVisibleChild(container)

  let prevScrollTop = container.scrollTop
  let prevScrollHeight = container.scrollHeight
  let prevOffsetTop = node.offsetTop
  let animationRequest = null

  function adjustScroll() {
    if (node.offsetTop !== prevOffsetTop) {
      let delta = node.offsetTop - prevOffsetTop

      container.scrollTop += delta
      prevOffsetTop = node.offsetTop
    }

    animationRequest = raf(adjustScroll)
  }

  callback()

  animationRequest = raf(adjustScroll)

  // Wait 300ms for transitions to end before we stop the adjustScroll loop
  _.delay((() => {
    caf(animationRequest)
    console.log('canceled')
  }), 1000)
}

export function getFirstVisibleChild(parent) {
  for (let child of parent.children) {
    if (parent.scrollTop < child.offsetTop + child.offsetHeight) {
      return child
    }
  }

  // No match found
  return null
}
