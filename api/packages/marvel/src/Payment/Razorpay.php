<?php

namespace Marvel\Payments;

use Exception;
use Marvel\Exceptions\MarvelException;
use Marvel\Payments\PaymentInterface;
use Marvel\Payments\Base;
use Razorpay\Api\Api;

class Razorpay extends Base implements PaymentInterface
{
  public  $api;

  public function __construct()
  {
    parent::__construct();
    $this->api = new Api(config('shop.razorpay.key_id'), config('shop.razorpay.key_secret'));
  }

  public function getIntent($data)
  {
    try {
      extract($data);
      $order = $this->api->order->create(array('amount' => $amount * 100, 'currency' => $this->currency));
      return [
        'order' => [
          'id' => $order->id,
          'currency' => $order->currency,
          'amount' => $order->amount,
        ],
        'is_redirect' => false,
      ];
    } catch (Exception $e) {
      throw new MarvelException(SOMETHING_WENT_WRONG_WITH_PAYMENT);
    }
  }

  public function verify($paymentId)
  {
    try {
      $payment = $this->api->payment->fetch($paymentId);
      return isset($payment->captured) ? $payment->captured : false;
    } catch (Exception $e) {
      throw new MarvelException(SOMETHING_WENT_WRONG_WITH_PAYMENT);
    }
  }


  public function handleWebHooks($request)
  {
    return 'razorpay webhooks';
  }
}
