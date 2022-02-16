import { useContext } from 'react';
import { Context } from '../../../context';

const Title = () => {
  const [state, dispatch] = useContext(Context);

  return (
    <i>
      <svg
        width='25'
        height='25'
        viewBox='0 0 25 25'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M12.5 3.125C7.32292 3.125 3.125 7.32292 3.125 12.5C3.125 17.6771 7.32292 21.875 12.5 21.875C13.3646 21.875 14.0625 21.1771 14.0625 20.3125C14.0625 19.9062 13.9062 19.5417 13.6562 19.2604C13.4167 18.9896 13.2604 18.625 13.2604 18.2292C13.2604 17.3646 13.9583 16.6667 14.8229 16.6667H16.6667C19.5417 16.6667 21.875 14.3333 21.875 11.4583C21.875 6.85417 17.6771 3.125 12.5 3.125ZM6.77083 12.5C5.90625 12.5 5.20833 11.8021 5.20833 10.9375C5.20833 10.0729 5.90625 9.375 6.77083 9.375C7.63542 9.375 8.33333 10.0729 8.33333 10.9375C8.33333 11.8021 7.63542 12.5 6.77083 12.5ZM9.89583 8.33333C9.03125 8.33333 8.33333 7.63542 8.33333 6.77083C8.33333 5.90625 9.03125 5.20833 9.89583 5.20833C10.7604 5.20833 11.4583 5.90625 11.4583 6.77083C11.4583 7.63542 10.7604 8.33333 9.89583 8.33333ZM15.1042 8.33333C14.2396 8.33333 13.5417 7.63542 13.5417 6.77083C13.5417 5.90625 14.2396 5.20833 15.1042 5.20833C15.9687 5.20833 16.6667 5.90625 16.6667 6.77083C16.6667 7.63542 15.9687 8.33333 15.1042 8.33333ZM18.2292 12.5C17.3646 12.5 16.6667 11.8021 16.6667 10.9375C16.6667 10.0729 17.3646 9.375 18.2292 9.375C19.0937 9.375 19.7917 10.0729 19.7917 10.9375C19.7917 11.8021 19.0937 12.5 18.2292 12.5Z'
          fill={state.darkMode ? '#FFFFFF' : '#CCCCCC'}
        />
      </svg>
    </i>
  );
};

export default Title;
