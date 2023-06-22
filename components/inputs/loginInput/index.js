import { ErrorMessage, useField } from 'formik';
import styles from './styles.module.scss';
import { BiUser } from 'react-icons/bi';
import { IoKeyOutline } from 'react-icons/io5';
import { SiMinutemailer } from 'react-icons/si';

export default function LoginInput({ icon, placeholder, ...props }) {
  const [field, meta] = useField(props);
  // console.log(meta);

  return (
    <div
      className={`${styles.input} ${
        meta.touched && meta.error ? styles.error : ''
      }`}
    >
      {icon == 'user' ? (
        <BiUser />
      ) : icon == 'email' ? (
        <SiMinutemailer />
      ) : icon == 'password' ? (
        <IoKeyOutline />
      ) : (
        ''
      )}
      <input
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div className={styles.error__popup}>
          <span>
            <ErrorMessage name={field.name} />
          </span>
        </div>
      )}
    </div>
  );
}
