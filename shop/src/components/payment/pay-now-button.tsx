import Button from '@/components/ui/button';
import { useTranslation } from 'next-i18next';
import { useGetPaymentIntent } from '@/framework/order';

interface Props {
  tracking_number: string;
  buttonSize?: 'big' | 'medium' | 'small';
}

const PayNowButton: React.FC<Props> = ({
  tracking_number,
  buttonSize = 'small',
}) => {
  const { t } = useTranslation();
  const { isLoading, getPaymentIntentQuery, data } = useGetPaymentIntent(
    {
      tracking_number: tracking_number,
    },
  );

  async function handlePayNow() {
    await getPaymentIntentQuery();
  }

  return (
    <Button
      className="w-full"
      onClick={handlePayNow}
      size={buttonSize}
      disabled={isLoading}
      loading={isLoading}
    >
      {t('text-pay-now')}
    </Button>
  );
};

export default PayNowButton;
