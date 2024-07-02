import { useFormStatus } from 'react-dom';

interface Props {
  formAction?: (formData: FormData) => void;
}

export default function EditButton({ formAction }: Props) {
  // useFormStatus 只能用在 form 元素内部使用
  // https://zh-hans.react.dev/reference/react-dom/hooks/useFormStatus#troubleshooting
  const { pending } = useFormStatus();
  return (
    <button
      className="note-editor-done"
      type="submit"
      formAction={formAction}
      disabled={pending}
      role="menuitem"
    >
      <img
        src="/checkmark.svg"
        width="14px"
        height="10px"
        alt=""
        role="presentation"
      />
      {pending ? 'Saving' : 'Done'}
    </button>
  );
}
