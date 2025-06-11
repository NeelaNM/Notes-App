
export default function ButtonSave({onSave}) {
    return (
        <button
            className='h-7.5 w-20 rounded-md border-transparent bg-sky-300'
            onClick={onSave}
        >
            Save
        </button>
    )
}