import s from './Form.module.scss';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { postPayments } from '../../api/httpClient';

const FormComponent = () => {
  const phoneRegExp = /\d+$/g;

  return (
    <>
      <h2 className="form__title">Accepting payments</h2>
      <Formik
        initialValues={{
          CardNumber: '',
          ExpDate: '',
          month: '',
          year: '',
          Cvv: '',
          Amount: '',
        }}
        validationSchema={Yup.object({
          CardNumber: Yup.string()
            .matches(phoneRegExp, 'Только число')
            .min(16, 'Менее 16 символа')
            .required('Обязательное поля'),
          month: Yup.string()
            .required('Обязательное поля')
            .test('len', 'Некорректный месяц', (val) => val <= 12),
          year: Yup.string()
            .required('Обязательное поля')
            .test('len', 'Некорректный год', (val) => val <= 2050 && val >= 2022),
          Cvv: Yup.string()
            .matches(phoneRegExp, 'Нужно обязательно число')
            .min(3, 'Минимум 3 символа')
            .required('Обязательное поля'),
          Amount: Yup.string()
            .matches(phoneRegExp, 'Нужно обязательно число')
            .required('Обязательное поля'),
        })}
        onSubmit={(values, { resetForm }) => {
          let expDate = (values.month < 10 ? '0' + values.month : values.month) + '/' + values.year;
          const newItem = {
            CardNumber: values.CardNumber,
            ExpDate: expDate,
            Cvv: values.Cvv,
            Amount: values.Amount,
          };
          postPayments(newItem);
          resetForm({ values: '' });
        }}>
        <Form className={s.form}>
          <div className={s.form__item}>
            <label htmlFor="card-number">Card Number</label>
            <Field
              className="card_input"
              id="card-number"
              type="text"
              placeholder="0000 0000 0000 0000"
              name="CardNumber"
              maxLength="16"
            />
            {<ErrorMessage className={s._error} name="CardNumber" component="div" />}
          </div>

          <div className={s.form__item}>
            <label htmlFor="expiration-date">Expiration Date</label>
            <div className={s.form__item_ExpDate}>
              <Field
                className={s.date__input}
                id="expiration-date"
                type="number"
                name="month"
                placeholder="MM"
                max="12"
                min="1"
                maxLength="2"
              />
              <span>/</span>
              <Field
                className={(s.date__input, s.year)}
                min="2022"
                type="number"
                name="year"
                placeholder="YYYY"
                max="9999"
              />
            </div>
            {<ErrorMessage className={s._error} name="month" component="div" />}
            {<ErrorMessage className={s._error} name="year" component="div" />}
          </div>

          <div className={s.form__item}>
            <label htmlFor="cvv">CVV</label>
            <Field
              className={s.cvv__input}
              id="cvv"
              type="text"
              placeholder="***"
              name="Cvv"
              maxLength="3"
            />
            {<ErrorMessage className={s._error} name="Cvv" component="div" />}
          </div>

          <div className={s.form__item}>
            <label htmlFor="amount">Amount</label>
            <Field className="amount__input" id="amount" type="text" name="Amount" />
            {<ErrorMessage className={s._error} name="Amount" component="div" />}
          </div>

          <button type="submit" className={s.form__btn}>
            Оплатить
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default FormComponent;
