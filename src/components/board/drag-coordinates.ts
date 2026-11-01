import type { KeyboardCoordinateGetter } from '@dnd-kit/core'

export const keyboardCoordinates: KeyboardCoordinateGetter = (
  event,
  { currentCoordinates, context },
) => {
  const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
  const rect = context.collisionRect
  if (!directions.includes(event.code) || !rect) return
  event.preventDefault()

  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2
  const candidates = context.droppableContainers
    .getEnabled()
    .filter((container) => container.id !== context.over?.id)
    .filter(
      (container) => container.data.current?.type === 'task' || container.data.current?.count === 0,
    )
    .flatMap((container) => {
      const target = context.droppableRects.get(container.id)
      if (!target) return []
      const dx = target.left + target.width / 2 - x
      const dy = target.top + target.height / 2 - y
      const isAhead =
        (event.code === 'ArrowUp' && dy < -1) ||
        (event.code === 'ArrowDown' && dy > 1) ||
        (event.code === 'ArrowLeft' && dx < -1) ||
        (event.code === 'ArrowRight' && dx > 1)
      return isAhead ? [{ dx, dy, distance: Math.hypot(dx, dy) }] : []
    })
    .sort((a, b) => a.distance - b.distance)

  const target = candidates[0]
  return target
    ? { x: currentCoordinates.x + target.dx, y: currentCoordinates.y + target.dy }
    : undefined
}
