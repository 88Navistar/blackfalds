// Image alignments
export const IMAGE_ALIGN = [
  {title: 'Left', value: 'left'},
  {title: 'Right', value: 'right'},
]

// Image widths
export const IMAGE_WIDTH = [
  {title: 'Small', value: 'small'},
  {title: 'Medium', value: 'medium'},
  {title: 'Large', value: 'large'},
]

// You can also create type utilities
export type ImageAlignment = (typeof IMAGE_ALIGN)[number]['value']
export type ImageWidth = (typeof IMAGE_WIDTH)[number]['value']

// Tailwind class mappings (for frontend)
export const IMAGE_WIDTH_CLASSES: Record<ImageWidth, string> = {
  small: 'w-1/3',
  medium: 'w-1/2',
  large: 'w-2/3',
}
