import React from 'react';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDispatch,useSelector } from 'react-redux';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Вы уверены, что хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
          <div className={styles.logoPng}></div>
            <div>Студенческое портфолио</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button className={styles.createBtn}>Загрузить проект</Button>
                </Link>
                <Button className="logoutBtn" onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button className={styles.loginBtn} variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button className={styles.regBtn} variant="contained">Создать аккаунт</Button>
                  
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
