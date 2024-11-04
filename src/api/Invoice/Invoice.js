import {bela} from '../api';

export const getInvoice = async invoice_id => {
  const res = await bela(`/invoices/api/checkout-success/${invoice_id}`);
  return res.data;
};
