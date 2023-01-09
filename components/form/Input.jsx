import React, { useRef, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BsInfoCircleFill } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';
import styles from './input.module.scss';

const Input = ({
  label,
  name,
  placeholder,
  type,
  prefix,
  variant,
  onChange,
  validation,
  ...rest
}) => {
  const [isValid, setIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef();

  const checkValidation = (e) => {
    setIsValid(validation.pattern.test(e.target.value));
  };

  return variant === 'form' ? (
    <div className={`${styles.input_group} ${!isValid && styles.error}`}>
      {prefix && prefix}

      <input
        ref={inputRef}
        type={showPassword ? 'text' : type}
        placeholder={placeholder}
        name={name}
        onChange={(e) => {
          setIsValid(true);
          onChange(e);
        }}
        onBlur={(e) => validation?.pattern && checkValidation(e)}
        {...rest}
      />

      {!isValid && (
        <div className={styles.error_tip}>
          <BsInfoCircleFill className={styles.error_info} />
          <small className={styles.error_message}>* {validation.message}</small>
        </div>
      )}

      {type === 'password' &&
        (!showPassword ? (
          <AiOutlineEye
            className={styles.showPassword}
            onClick={() => setShowPassword(true)}
          />
        ) : (
          <AiOutlineEyeInvisible
            className={styles.hidePassword}
            onClick={() => setShowPassword(false)}
          />
        ))}

      <label htmlFor={name} onClick={(e) => inputRef.current.focus()}>
        {label}
      </label>
    </div>
  ) : (
    <div className={styles.input}>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        {...rest}
      />
      <FaSearch />
    </div>
  );
};

export default Input;