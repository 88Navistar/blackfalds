import {defineField, defineType} from 'sanity'

export const citationMark = defineType({
  name: 'citationMark',
  title: 'Citation',
  type: 'object',
  fields: [
    defineField({
      name: 'citation',
      title: 'Citation',
      type: 'reference',
      to: [{type: 'source'}], // Reference to your source document type
    }),
  ],
  components: {
    annotation: ({value, children}: {value: any; children: any}) => (
      <span className="inline-flex items-baseline">
        {children}
        <sup className="ml-0.5 text-sm text-stone-500">[{value?.citation?.citationNumber}]</sup>
      </span>
    ),
  },
})
