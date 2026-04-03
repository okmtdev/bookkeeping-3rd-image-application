import { Account } from '@/types';

export const accounts: Account[] = [
  // 資産
  { id: 'cash', name: '現金', category: 'asset', description: '手元にあるお金' },
  { id: 'deposit', name: '普通預金', category: 'asset', description: '銀行に預けているお金' },
  { id: 'fixed_deposit', name: '定期預金', category: 'asset', description: '一定期間預ける預金' },
  { id: 'accounts_receivable', name: '売掛金', category: 'asset', description: '商品を売ったがまだもらっていないお金' },
  { id: 'notes_receivable', name: '受取手形', category: 'asset', description: '手形で受け取る予定のお金' },
  { id: 'merchandise', name: '商品', category: 'asset', description: '販売するために持っている商品' },
  { id: 'supplies', name: '消耗品', category: 'asset', description: '事務用品など消耗するもの' },
  { id: 'equipment', name: '備品', category: 'asset', description: 'パソコンや机などの設備' },
  { id: 'vehicles', name: '車両運搬具', category: 'asset', description: '業務用の車両' },
  { id: 'building', name: '建物', category: 'asset', description: '店舗や事務所の建物' },
  { id: 'land', name: '土地', category: 'asset', description: '所有している土地' },
  { id: 'electronic_receivable', name: '電子記録債権', category: 'asset', description: '電子的に記録された債権' },
  { id: 'prepaid', name: '前払金', category: 'asset', description: '商品を受け取る前に支払ったお金' },
  { id: 'temporary_payment', name: '仮払金', category: 'asset', description: '使途や金額が未確定の支出' },
  { id: 'advance_to_employee', name: '立替金', category: 'asset', description: '従業員などに代わって立て替えたお金' },
  { id: 'accrued_revenue', name: '未収入金', category: 'asset', description: '商品以外の取引で受け取っていないお金' },
  { id: 'prepaid_expense', name: '前払費用', category: 'asset', description: '翌期以降の費用を前払いした分' },
  { id: 'accrued_income', name: '未収収益', category: 'asset', description: '当期に発生したがまだ受け取っていない収益' },
  { id: 'cash_over_short', name: '現金過不足', category: 'asset', description: '現金の帳簿残高と実際残高の差額' },

  // 負債
  { id: 'accounts_payable', name: '買掛金', category: 'liability', description: '商品を買ったがまだ払っていないお金' },
  { id: 'notes_payable', name: '支払手形', category: 'liability', description: '手形で支払う予定のお金' },
  { id: 'borrowing', name: '借入金', category: 'liability', description: '銀行などから借りたお金' },
  { id: 'unearned_revenue', name: '前受金', category: 'liability', description: '商品を渡す前にもらったお金' },
  { id: 'electronic_payable', name: '電子記録債務', category: 'liability', description: '電子的に記録された債務' },
  { id: 'unpaid', name: '未払金', category: 'liability', description: '商品以外の取引でまだ払っていないお金' },
  { id: 'temporary_receipt', name: '仮受金', category: 'liability', description: '内容が未確定の入金' },
  { id: 'deposits_received', name: '預り金', category: 'liability', description: '他人から一時的に預かったお金' },
  { id: 'accrued_expense', name: '未払費用', category: 'liability', description: '当期に発生したがまだ払っていない費用' },
  { id: 'unearned_income', name: '前受収益', category: 'liability', description: '翌期以降の収益を前もって受け取った分' },

  // 純資産
  { id: 'capital', name: '資本金', category: 'equity', description: 'オーナーが出したお金（元手）' },
  { id: 'retained_earnings', name: '繰越利益剰余金', category: 'equity', description: '過去の利益の蓄積' },

  // 収益
  { id: 'sales', name: '売上', category: 'revenue', description: '商品を売って得た収入' },
  { id: 'interest_income', name: '受取利息', category: 'revenue', description: '預金などから得た利息' },
  { id: 'fee_income', name: '受取手数料', category: 'revenue', description: 'サービス提供で得た手数料' },
  { id: 'gain_on_sale', name: '固定資産売却益', category: 'revenue', description: '固定資産を帳簿価額より高く売った利益' },
  { id: 'miscellaneous_income', name: '雑益', category: 'revenue', description: '本業以外の少額な収益' },

  // 費用
  { id: 'purchases', name: '仕入', category: 'expense', description: '商品を買うための費用' },
  { id: 'salary', name: '給料', category: 'expense', description: '従業員に払う給料' },
  { id: 'rent', name: '支払家賃', category: 'expense', description: '店舗や事務所の家賃' },
  { id: 'utilities', name: '水道光熱費', category: 'expense', description: '電気・ガス・水道の料金' },
  { id: 'communication', name: '通信費', category: 'expense', description: '電話やインターネット代' },
  { id: 'depreciation', name: '減価償却費', category: 'expense', description: '固定資産の価値減少分の費用' },
  { id: 'supplies_expense', name: '消耗品費', category: 'expense', description: '使った消耗品の費用' },
  { id: 'interest_expense', name: '支払利息', category: 'expense', description: '借入金にかかる利息' },
  { id: 'travel_expense', name: '旅費交通費', category: 'expense', description: '出張や移動にかかる費用' },
  { id: 'insurance', name: '保険料', category: 'expense', description: '火災保険などの保険料' },
  { id: 'advertising', name: '広告宣伝費', category: 'expense', description: 'チラシやWeb広告の費用' },
  { id: 'repair_expense', name: '修繕費', category: 'expense', description: '建物や備品の修理費用' },
  { id: 'taxes_dues', name: '租税公課', category: 'expense', description: '印紙税や固定資産税など' },
  { id: 'loss_on_sale', name: '固定資産売却損', category: 'expense', description: '固定資産を帳簿価額より安く売った損失' },
  { id: 'miscellaneous_expense', name: '雑損', category: 'expense', description: '本業以外の少額な損失' },
];

export const getAccount = (id: string): Account | undefined =>
  accounts.find((a) => a.id === id);

export const getAccountsByCategory = (category: Account['category']): Account[] =>
  accounts.filter((a) => a.category === category);
