import { zodResolver } from '@hookform/resolvers/zod';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../components/Button';
import { Checkbox } from '../../components/Checkbox/';
import { TextField } from '../../components/TextField';

// --- Zod Schema ---

const userRegisterSchema = z.object({
  // 氏名は1フィールド（FORM_GUIDE: 「姓・名」で分けない）
  name: z
    .string()
    .min(1, '氏名を入力してください')
    .max(100, '100文字以内で入力してください'),

  // メール再入力は不要（FORM_GUIDE: 確認メールで検証）
  email: z
    .email('「@」を含む有効なメールアドレスを入力してください')
    .min(1, 'メールアドレスを入力してください'),

  // パスワード（FORM_GUIDE: 再入力は避ける、表示/非表示トグル付き）
  password: z
    .string()
    .min(8, 'パスワードは8文字以上で入力してください')
    .regex(/[A-Z]/, '大文字を1文字以上含めてください')
    .regex(/[a-z]/, '小文字を1文字以上含めてください')
    .regex(/[0-9]/, '数字を1文字以上含めてください'),

  // 電話番号（FORM_GUIDE: 1フィールド、ハイフンは後処理）
  phone: z
    .string()
    .min(1, '電話番号を入力してください')
    .regex(/^[0-9０-９\-ー]+$/, '数字とハイフンのみ入力してください')
    .transform((val) =>
      val
        .replace(/[０-９]/g, (s) =>
          String.fromCharCode(s.charCodeAt(0) - 65248),
        )
        .replace(/[ーー]/g, '-'),
    ),

  // 郵便番号（分割しない、ハイフン有無両対応、7桁厳密チェック）
  postalCode: z
    .string()
    .min(1, '郵便番号を入力してください')
    .regex(
      /^[0-9０-９]{3}[-ー]?[0-9０-９]{4}$/,
      '正しい郵便番号を入力してください（例：1000001 または 100-0001）',
    ),

  // 住所（郵便番号から自動入力される都道府県〜町域）
  address: z.string().min(1, '郵便番号を入力して住所を検索してください'),

  // 番地
  streetNumber: z.string().min(1, '番地を入力してください'),

  // 建物名・部屋番号（任意）
  buildingName: z.string().optional(),

  // 利用規約同意
  agreeToTerms: z.literal(true, {
    error: '利用規約への同意が必要です',
  }),
});

export type UserRegisterFormValues = z.infer<typeof userRegisterSchema>;

export interface UserRegisterFormProps {
  /** フォーム送信時のコールバック */
  onSubmit?: (data: UserRegisterFormValues) => Promise<void> | void;
}

// --- 郵便番号から数字のみ抽出 ---
function extractDigits(postalCode: string): string {
  return postalCode
    .replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 65248))
    .replace(/\D/g, '');
}

// --- 住所検索ステータス ---
type AddressLookupStatus =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'success' }
  | { type: 'not_found' }
  | { type: 'error'; message: string };

export function UserRegisterForm({
  onSubmit: onSubmitProp,
}: UserRegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [lookupStatus, setLookupStatus] = useState<AddressLookupStatus>({
    type: 'idle',
  });
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    setValue,
    watch,
  } = useForm<UserRegisterFormValues>({
    resolver: zodResolver(userRegisterSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      postalCode: '',
      address: '',
      streetNumber: '',
      buildingName: '',
      agreeToTerms: false as boolean as true,
    },
  });

  const postalCodeValue = watch('postalCode');

  // --- jp-zipcode-lookup で住所検索 ---
  const lookupAddress = useCallback(
    async (postalCode: string) => {
      const digits = extractDigits(postalCode);

      // 7桁揃うまで叩かない
      if (digits.length !== 7) return;

      setLookupStatus({ type: 'loading' });

      // 最小1秒間はローディングを表示するためのタイマー
      const minWait = new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const { Oaza } = await import('jp-zipcode-lookup');

        const results = Oaza.byZipcode(digits);

        // 検索完了と最小n秒の経過を待つ
        await minWait;

        if (results.length > 0) {
          const oaza = results[0];
          const fullAddress = `${oaza.pref.name}${oaza.city.name}${oaza.name}`;
          setValue('address', fullAddress, { shouldValidate: true });
          setLookupStatus({ type: 'success' });
        } else {
          setLookupStatus({ type: 'not_found' });
        }
      } catch {
        await minWait;
        setLookupStatus({
          type: 'error',
          message: '住所の検索に失敗しました',
        });
      }
    },
    [setValue],
  );

  // --- debounce: 郵便番号が7桁になったら自動検索 ---
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const digits = extractDigits(postalCodeValue);
    if (digits.length === 7) {
      debounceTimerRef.current = setTimeout(() => {
        lookupAddress(postalCodeValue);
      }, 400);
    } else {
      // 7桁未満ならステータスをリセット
      setLookupStatus({ type: 'idle' });
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [postalCodeValue, lookupAddress]);

  const onSubmit = async (data: UserRegisterFormValues) => {
    if (onSubmitProp) {
      await onSubmitProp(data);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('✅ User registered:', data);
    }
  };

  // 登録完了画面
  if (isSubmitSuccessful) {
    return (
      <div className='flex flex-col items-center gap-4 p-8 text-center'>
        <p className='text-2xl'>🎉</p>
        <p className='text-lg font-semibold'>登録が完了しました！</p>
        <p className='text-sm text-gray-600'>
          確認メールを送信しました。メール内のリンクからアカウントを有効化してください。
        </p>
        <Button variant='outline' onPress={() => reset()}>
          別のアカウントを登録
        </Button>
      </div>
    );
  }

  // --- 住所検索ステータスに応じたメッセージ ---
  const renderLookupFeedback = () => {
    let content = null;
    switch (lookupStatus.type) {
      case 'loading':
        content = <span className='text-xs text-gray-400'>🔍 検索中...</span>;
        break;
      case 'success':
        content = (
          <span className='text-xs text-green-600'>✅ 住所を取得しました</span>
        );
        break;
      case 'not_found':
        content = (
          <span className='text-xs text-amber-600'>
            ⚠️ 該当する住所が見つかりませんでした
          </span>
        );
        break;
      case 'error':
        content = (
          <span className='text-xs text-red-600'>
            ❌ {lookupStatus.message}
          </span>
        );
        break;
      default:
        content = null;
    }

    return (
      <output
        id='postal-code-feedback'
        aria-live='polite'
        className='h-5 flex items-center'
      >
        {content}
      </output>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className='flex flex-col gap-6 w-full max-w-md'
    >
      {/* 氏名（1フィールド） */}
      <Controller
        name='name'
        control={control}
        render={({ field }) => (
          <TextField.Root
            isInvalid={!!errors.name}
            isRequired
            className='flex flex-col gap-1'
          >
            <TextField.Label>氏名</TextField.Label>
            <TextField.Input
              placeholder='例：山田 太郎'
              autoComplete='name'
              value={field.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.onChange(e.target.value)
              }
              onBlur={field.onBlur}
              ref={field.ref}
            />
            {errors.name && (
              <TextField.Error>{errors.name.message}</TextField.Error>
            )}
          </TextField.Root>
        )}
      />

      {/* メールアドレス（再入力なし） */}
      <Controller
        name='email'
        control={control}
        render={({ field }) => (
          <TextField.Root
            isInvalid={!!errors.email}
            isRequired
            className='flex flex-col gap-1'
          >
            <TextField.Label>メールアドレス</TextField.Label>
            <TextField.Input
              type='email'
              placeholder='例：taro@example.com'
              autoComplete='email'
              value={field.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.onChange(e.target.value)
              }
              onBlur={field.onBlur}
              ref={field.ref}
            />
            <TextField.Description>
              登録後に確認メールを送信します
            </TextField.Description>
            {errors.email && (
              <TextField.Error>{errors.email.message}</TextField.Error>
            )}
          </TextField.Root>
        )}
      />

      {/* パスワード（表示/非表示トグル付き） */}
      <Controller
        name='password'
        control={control}
        render={({ field }) => (
          <TextField.Root
            isInvalid={!!errors.password}
            isRequired
            className='flex flex-col gap-1'
          >
            <div className='flex justify-between items-baseline'>
              <TextField.Label>パスワード</TextField.Label>
              <button
                type='button'
                className='text-xs text-gray-500 hover:text-black underline cursor-pointer'
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? 'パスワードを隠す' : 'パスワードを表示'
                }
              >
                {showPassword ? 'パスワードを隠す' : 'パスワードを表示'}
              </button>
            </div>
            <TextField.Input
              type={showPassword ? 'text' : 'password'}
              placeholder='8文字以上（大文字・小文字・数字を含む）'
              autoComplete='new-password'
              value={field.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.onChange(e.target.value)
              }
              onBlur={field.onBlur}
              ref={field.ref}
            />
            <TextField.Description>
              8文字以上で、大文字・小文字・数字をそれぞれ1文字以上含めてください
            </TextField.Description>
            {errors.password && (
              <TextField.Error>{errors.password.message}</TextField.Error>
            )}
          </TextField.Root>
        )}
      />

      {/* 電話番号（1フィールド、ハイフンは後処理） */}
      <Controller
        name='phone'
        control={control}
        render={({ field }) => (
          <TextField.Root
            isInvalid={!!errors.phone}
            isRequired
            className='flex flex-col gap-1'
          >
            <TextField.Label>電話番号</TextField.Label>
            <TextField.Input
              type='tel'
              placeholder='例：09012345678'
              autoComplete='tel'
              value={field.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                field.onChange(e.target.value)
              }
              onBlur={field.onBlur}
              ref={field.ref}
            />
            <TextField.Description>
              ハイフンあり・なしどちらでも入力できます
            </TextField.Description>
            {errors.phone && (
              <TextField.Error>{errors.phone.message}</TextField.Error>
            )}
          </TextField.Root>
        )}
      />

      {/* ===== 住所セクション ===== */}
      <fieldset className='flex flex-col gap-4 border-t pt-4'>
        <legend className='text-sm font-semibold text-gray-700 mb-1'>
          住所
        </legend>

        {/* 郵便番号（分割しない、ハイフン有無両対応） */}
        <Controller
          name='postalCode'
          control={control}
          render={({ field }) => (
            <TextField.Root
              isInvalid={!!errors.postalCode}
              isRequired
              className='flex flex-col gap-1'
            >
              <TextField.Label>郵便番号</TextField.Label>
              <div className='flex gap-2 items-center'>
                <div className='flex-1'>
                  <TextField.Input
                    placeholder='例：1000001'
                    autoComplete='postal-code'
                    inputMode='numeric'
                    aria-describedby='postal-code-feedback'
                    value={field.value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.onChange(e.target.value)
                    }
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                </div>
                {/* 住所検索ボタン */}
                <div className='w-24'>
                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onPress={() => lookupAddress(postalCodeValue)}
                    isPending={lookupStatus.type === 'loading'}
                  >
                    {lookupStatus.type === 'loading'
                      ? '...検索中'
                      : '住所を検索'}
                  </Button>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <TextField.Description>
                  ハイフンあり・なし両対応
                </TextField.Description>
                {renderLookupFeedback()}
              </div>
              {errors.postalCode && (
                <TextField.Error>{errors.postalCode.message}</TextField.Error>
              )}
            </TextField.Root>
          )}
        />

        {/* 住所（自動入力、都道府県〜町域） */}
        <Controller
          name='address'
          control={control}
          render={({ field }) => (
            <TextField.Root
              isInvalid={!!errors.address}
              isRequired
              className='flex flex-col gap-1'
            >
              <TextField.Label>都道府県・市区町村</TextField.Label>
              <TextField.Input
                placeholder='郵便番号から自動入力されます'
                autoComplete='address-level1'
                value={field.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(e.target.value)
                }
                onBlur={field.onBlur}
                ref={field.ref}
              />
              {errors.address && (
                <TextField.Error>{errors.address.message}</TextField.Error>
              )}
            </TextField.Root>
          )}
        />

        {/* 番地 */}
        <Controller
          name='streetNumber'
          control={control}
          render={({ field }) => (
            <TextField.Root
              isInvalid={!!errors.streetNumber}
              isRequired
              className='flex flex-col gap-1'
            >
              <TextField.Label>番地</TextField.Label>
              <TextField.Input
                placeholder='例：1-2-3'
                autoComplete='address-line1'
                value={field.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(e.target.value)
                }
                onBlur={field.onBlur}
                ref={field.ref}
              />
              {errors.streetNumber && (
                <TextField.Error>{errors.streetNumber.message}</TextField.Error>
              )}
            </TextField.Root>
          )}
        />

        {/* 建物名・部屋番号（任意） */}
        <Controller
          name='buildingName'
          control={control}
          render={({ field }) => (
            <TextField.Root className='flex flex-col gap-1'>
              <TextField.Label>建物名・部屋番号（任意）</TextField.Label>
              <TextField.Input
                placeholder='例：○○マンション 101号室'
                autoComplete='address-line2'
                value={field.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  field.onChange(e.target.value)
                }
                onBlur={field.onBlur}
                ref={field.ref}
              />
            </TextField.Root>
          )}
        />
      </fieldset>

      {/* 利用規約同意 */}
      <Controller
        name='agreeToTerms'
        control={control}
        render={({ field }) => (
          <div className='flex flex-col gap-1'>
            <Checkbox
              isSelected={field.value}
              onChange={field.onChange}
              name={field.name}
            >
              <span>
                <a href='#terms' className='underline hover:text-gray-600'>
                  利用規約
                </a>
                と
                <a href='#privacy' className='underline hover:text-gray-600'>
                  プライバシーポリシー
                </a>
                に同意する
              </span>
            </Checkbox>
            {errors.agreeToTerms && (
              <p className='text-sm text-red-600'>
                {errors.agreeToTerms.message}
              </p>
            )}
          </div>
        )}
      />

      {/* 登録ボタン */}
      <Button type='submit' variant='primary' isPending={isSubmitting}>
        アカウントを作成
      </Button>
    </form>
  );
}
