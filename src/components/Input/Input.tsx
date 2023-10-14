import classNames from "classnames";
import {
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useCallback
} from "react";

type Props = {
  label?: string
}

function Input({
  className,
  label,
  ...props
}: Props & InputHTMLAttributes<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) {
  const getLabel = useCallback(() => {
    if (label) {
      return <span className="c-input">{label}</span>;
    } else {
      return null;
    }
  }, [label]);

  return (
    <div className={classNames("c-input", className)}>
      {getLabel()}
      <input
        className="c-input__input"
        ref={ref}
        {...props}
      />
    </div >
  );
}

export default forwardRef(Input);