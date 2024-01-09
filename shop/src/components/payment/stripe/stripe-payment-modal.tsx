import { Card, PaymentGateway, PaymentIntentInfo } from '@/types';
import { Elements } from '@stripe/react-stripe-js';
import getStripe from '@/lib/get-stripejs';
import StripePaymentForm from '@/components/payment/stripe/stripe-payment-form';
import SavedCardViewHeader from '@/components/payment/saved-card-view-header';
import StripeSavedCardsList from '@/components/payment/stripe/stripe-saved-cards-list';

interface Props {
  paymentIntentInfo: PaymentIntentInfo;
  trackingNumber: string;
  paymentGateway: PaymentGateway;
  cards: Card[];
}

const StripePaymentModal: React.FC<Props> = ({
  paymentIntentInfo,
  trackingNumber,
  paymentGateway,
  cards,
}) => {
  return (
    <Elements stripe={getStripe()}>
      {cards?.length > 0 ? (
        <div className="w-full max-w-4xl rounded-xl bg-white p-6 md:p-12">
          <SavedCardViewHeader
            paymentIntentInfo={paymentIntentInfo}
            trackingNumber={trackingNumber}
            paymentGateway={paymentGateway}
          />
          <StripeSavedCardsList view="modal" payments={cards} />
        </div>
      ) : (
        <StripePaymentForm
          paymentIntentInfo={paymentIntentInfo}
          trackingNumber={trackingNumber}
          paymentGateway={paymentGateway}
        />
      )}
    </Elements>
  );
};

export default StripePaymentModal;
