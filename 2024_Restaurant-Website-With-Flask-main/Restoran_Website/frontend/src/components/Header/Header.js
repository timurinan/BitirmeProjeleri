import React from 'react'
import classes from './header.module.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {

    const {user , logout}  = useAuth();

    const {cart} = useCart();


    return (
        <header className={classes.header}>
          <div className={classes.container}>
            <Link to="/" className={classes.logo}>
              Magnolia Rastaurant
            </Link>
            
            <nav>
          <ul>
            {user ? (
              <li className={classes.menu_container}>
                <Link to="/dashboard">{user.name}</Link>
                <div className={classes.menu}>
                  <Link to="/profile">Profil</Link>
                  <Link to="/orders">Siparişler</Link>
                  <a onClick={logout}>Logout</a>
                </div>
              </li>
            ) : (
              <Link to="/login">Giriş Yap</Link>
            )}

            <li>
              <Link to="/cart">
                SEPET
                {cart.totalCount > 0 && (
                  <span className={classes.cart_count}>{cart.totalCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>

          </div>
        </header>
      );
  
}