import { useModalState } from '@/components/ui/modal/modal.context';
import { useCards } from '@/framework/card';
import ErrorMessage from '@/components/ui/error-message';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import StripePaymentModal from '@/components/payment/stripe/stripe-payment-modal';

const PAYMENTS_FORM_COMPONENTS: any = {
  STRIPE: {
    component: StripePaymentModal,
  },
};

const PaymentModal = () => {
  const {
    data: { paymentGateway, paymentIntentInfo, trackingNumber },
  } = useModalState();
  const { cards, isLoading, error } = useCards();
  const PaymentMethod = PAYMENTS_FORM_COMPONENTS[paymentGateway?.toUpperCase()];
  const PaymentComponent = PaymentMethod?.component;

  if (isLoading) {
    return (
      <div className="h-96 w-screen max-w-md rounded-xl bg-white p-12 lg:w-full lg:min-w-[48rem]">
        <Spinner className="!h-full" showText={false} />
      </div>
    );
  }

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <PaymentComponent
      paymentIntentInfo={paymentIntentInfo}
      trackingNumber={trackingNumber}
      paymentGateway={paymentGateway}
      cards={cards}
    />
  );
};
export default PaymentModal;
