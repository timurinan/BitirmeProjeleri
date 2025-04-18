import React, { useEffect, useState } from 'react';
import classes from './cartPage.module.css';
import { useCart } from '../../hooks/useCart';
import Title from '../../components/Title/Title';
import { Link, useNavigate } from 'react-router-dom';
import Price from '../../components/Price/Price';
import NotFound from '../../components/NotFound/NotFound';

export default function CartPage() {
    const { cart, removeFromCart, changeQuantity, addToCart } = useCart();
    const [recommendation, setRecommendation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [weeklyFavorite, setWeeklyFavorite] = useState(null);
    const [monthlyFavorite, setMonthlyFavorite] = useState(null);
    const navigate = useNavigate();

    const fetchRecommendation = async (itemName) => {
      try {
          const response = await fetch(`http://127.0.0.1:5000/recommendations?item_name=${itemName}`);
          const data = await response.json();
          if (!data.error) {
              setRecommendation(data);
              setIsModalOpen(true); // Modal'ı aç
          } else {
              setRecommendation(null);
          }
      } catch (error) {
          console.error("Error fetching recommendation:", error);
          setRecommendation(null);
      }
  };

  const fetchWeeklyFavorite = async () => {
      try {
          const response = await fetch('http://127.0.0.1:5000/weekly_favorites');
          const data = await response.json();
          if (data.length > 0) {
              setWeeklyFavorite(data[0]);
          }
      } catch (error) {
          console.error("Error fetching weekly favorite:", error);
      }
  };

  const fetchMonthlyFavorite = async () => {
      try {
          const response = await fetch('http://127.0.0.1:5000/monthly_favorites');
          const data = await response.json();
          if (data.length > 0) {
              setMonthlyFavorite(data[0]);
          }
      } catch (error) {
          console.error("Error fetching monthly favorite:", error);
      }
  };

  useEffect(() => {
      if (cart.items.length > 0) {
          fetchRecommendation(cart.items[cart.items.length - 1].food.name);
      }
      fetchWeeklyFavorite();
      fetchMonthlyFavorite();
  }, [cart]);

  const addRecommendedItemToCart = (recommendedItem) => {
      addToCart(recommendedItem); // Sepete ekleme işlemi
      setIsModalOpen(false); // Modal'ı kapat
  };

  return (
      <>
        <Title title="SEPET" margin="1.5rem 0 0 2.5rem" />

        {cart.items.length === 0 ? (
        <NotFound message="Sepetiniz Boş!" />
        ) : (
          <div className={classes.container}>
            <ul className={classes.list}>
              {cart.items.map(item => (
                <li key={item.food.id}>
                  <div>
                    <img src={`${item.food.imageUrl}`} alt={item.food.name} />
                  </div>
                  <div>
                    <Link to={`${item.food.id}`}>{item.food.name}</Link>
                  </div>

                  <div>
                    <select
                      value={item.quantity}
                      onChange={e => changeQuantity(item, Number(e.target.value))}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                    </select>
                  </div>

                  <div>
                    <Price price={item.price} />
                  </div>

                  <div>
                    <button
                      className={classes.remove_button}
                      onClick={() => removeFromCart(item.food.id)}
                    >
                      Kaldır
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className={classes.checkout}>
              <div>
                <div className={classes.foods_count}>{cart.totalCount}</div>
                <div className={classes.total_price}>
                  <Price price={cart.totalPrice} />
                </div>
              </div>

              <Link to="/checkout">Ödeme İşlemine Geç</Link>
            </div>
          </div>
        )}

        {recommendation && (
          <div className={classes.recommendationBox}>
              <p>
                "{cart.items[cart.items.length - 1].food.name}" alanlar yanında "{recommendation.consequents}" da tercih ettiler.
                Sizin için bu ürünü sepete eklememizi ister misiniz?
              </p>
              <button onClick={() => addRecommendedItemToCart(recommendation.consequents)}>
                EVET
              </button>
              <button onClick={() => setRecommendation(null)}>
                HAYIR
              </button>
          </div>
          )}
        {weeklyFavorite && (
          <div className={`modal ${isModalOpen ? 'show' : ''}`}>
             <div className={classes.recommendationBox}>
        
              <p className="popup-message">
                Bu haftanın favorisi "{weeklyFavorite.item_name}" oldu! Sizin için bu ürünü sepete eklememizi ister misiniz?
              </p>
              <button onClick={() => addRecommendedItemToCart(weeklyFavorite.item_name)}>
                EVET
              </button>
              <button onClick={() => setRecommendation(null)}>
                HAYIR
              </button>
            </div>
          </div>
        )}

        {monthlyFavorite && (
          <div className={`modal ${isModalOpen ? 'show' : ''}`}>
             <div className={classes.recommendationBox}>
              
              <p className="popup-message">
                Bu ayın favorisi "{monthlyFavorite.item_name}" oldu! Sizin için bu ürünü sepete eklememizi ister misiniz?
              </p>
              <button onClick={() => addRecommendedItemToCart(monthlyFavorite.item_name)}>
                EVET
              </button>
              <button onClick={() => setRecommendation(null)}>
                HAYIR
              </button>
            </div>
          </div>

        )}
      </>
    );
}