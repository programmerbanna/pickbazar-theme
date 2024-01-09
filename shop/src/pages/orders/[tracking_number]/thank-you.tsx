import { getLayout } from '@/components/layouts/layout';
import Order from '@/components/orders/order-view';
import Seo from '@/components/seo/seo';
import { useEffect } from 'react';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { useOrder, useOrderPayment } from '@/framework/order';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

export { getServerSideProps } from '@/framework/order.ssr';

export default function OrderPage() {
  const { query } = useRouter();
  const { t } = useTranslation();
  const { order, isLoading, isFetching } = useOrder({
    tracking_number: query.tracking_number!.toString(),
  });
  const { createOrderPayment } = useOrderPayment();

  useEffect(() => {
    toast.success(t('payment-successful'));
    createOrderPayment({
      tracking_number: query?.tracking_number as string,
    });
  }, []);

  if (isLoading) {
    return <Spinner showText={false} />;
  }

  return (
    <>
      <Seo noindex={true} nofollow={true} />
      <Order order={order} loadingStatus={!isLoading && isFetching} />
    </>
  );
}

OrderPage.getLayout = getLayout;
