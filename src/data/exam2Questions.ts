import { TAccountQuestion, SubsidiaryLedgerQuestion } from '@/types';

// 第二問: 勘定記入（T勘定）問題
export const tAccountQuestions: TAccountQuestion[] = [
  {
    id: 'ta_1',
    title: '現金勘定の記入',
    description:
      '次の取引を現金勘定に記入しなさい。\n4/1 資本金500,000円を現金で元入れした。\n4/5 商品200,000円を現金で仕入れた。\n4/10 商品を300,000円で現金販売した。\n4/15 家賃50,000円を現金で支払った。',
    hint: '現金は資産なので、増加は借方（左）、減少は貸方（右）に記入します。',
    accountName: '現金',
    accountId: 'cash',
    correctDebitEntries: [
      { date: '4/1', description: '資本金', amount: 500000 },
      { date: '4/10', description: '売上', amount: 300000 },
    ],
    correctCreditEntries: [
      { date: '4/5', description: '仕入', amount: 200000 },
      { date: '4/15', description: '支払家賃', amount: 50000 },
    ],
  },
  {
    id: 'ta_2',
    title: '売掛金勘定の記入',
    description:
      '次の取引を売掛金勘定に記入しなさい。\n5/1 前月繰越 150,000円\n5/3 商品80,000円を掛けで販売した。\n5/10 売掛金100,000円を現金で回収した。\n5/20 商品120,000円を掛けで販売した。\n5/25 売掛金80,000円が普通預金に振り込まれた。',
    hint: '売掛金は資産なので、増加（掛け売り）は借方、減少（回収）は貸方に記入します。',
    accountName: '売掛金',
    accountId: 'accounts_receivable',
    correctDebitEntries: [
      { date: '5/1', description: '前月繰越', amount: 150000 },
      { date: '5/3', description: '売上', amount: 80000 },
      { date: '5/20', description: '売上', amount: 120000 },
    ],
    correctCreditEntries: [
      { date: '5/10', description: '現金', amount: 100000 },
      { date: '5/25', description: '普通預金', amount: 80000 },
    ],
  },
  {
    id: 'ta_3',
    title: '買掛金勘定の記入',
    description:
      '次の取引を買掛金勘定に記入しなさい。\n6/1 前月繰越 200,000円\n6/5 商品150,000円を掛けで仕入れた。\n6/12 買掛金120,000円を現金で支払った。\n6/18 商品90,000円を掛けで仕入れた。\n6/28 買掛金100,000円を普通預金から振り込んだ。',
    hint: '買掛金は負債なので、増加（掛け仕入）は貸方、減少（支払い）は借方に記入します。',
    accountName: '買掛金',
    accountId: 'accounts_payable',
    correctDebitEntries: [
      { date: '6/12', description: '現金', amount: 120000 },
      { date: '6/28', description: '普通預金', amount: 100000 },
    ],
    correctCreditEntries: [
      { date: '6/1', description: '前月繰越', amount: 200000 },
      { date: '6/5', description: '仕入', amount: 150000 },
      { date: '6/18', description: '仕入', amount: 90000 },
    ],
  },
  {
    id: 'ta_4',
    title: '借入金勘定の記入',
    description:
      '次の取引を借入金勘定に記入しなさい。\n7/1 銀行から300,000円を借り入れ、普通預金に入金された。\n7/15 借入金100,000円を普通預金から返済した。\n7/31 借入金の利息3,000円を現金で支払った（利息は別勘定で処理）。',
    hint: '借入金は負債なので、増加（借入）は貸方、減少（返済）は借方に記入します。利息は支払利息勘定で処理するため、借入金勘定には記入しません。',
    accountName: '借入金',
    accountId: 'borrowing',
    correctDebitEntries: [
      { date: '7/15', description: '普通預金', amount: 100000 },
    ],
    correctCreditEntries: [
      { date: '7/1', description: '普通預金', amount: 300000 },
    ],
  },
  {
    id: 'ta_5',
    title: '売上勘定の記入',
    description:
      '次の取引を売上勘定に記入しなさい。\n8/3 商品50,000円を現金で販売した。\n8/8 商品120,000円を掛けで販売した。\n8/15 8/8の掛け販売のうち10,000円が返品された（売上戻り）。\n8/22 商品80,000円を現金で販売した。',
    hint: '売上は収益なので、発生は貸方、取消（返品）は借方に記入します。',
    accountName: '売上',
    accountId: 'sales',
    correctDebitEntries: [
      { date: '8/15', description: '売掛金', amount: 10000 },
    ],
    correctCreditEntries: [
      { date: '8/3', description: '現金', amount: 50000 },
      { date: '8/8', description: '売掛金', amount: 120000 },
      { date: '8/22', description: '現金', amount: 80000 },
    ],
  },
];

// 第二問: 補助簿選択問題
export const subsidiaryLedgerQuestions: SubsidiaryLedgerQuestion[] = [
  {
    id: 'sl_1',
    title: '現金仕入',
    description: '商品100,000円を現金で仕入れた。',
    hint: '現金が動くので現金出納帳、仕入なので仕入帳に記入します。',
    journalEntry: {
      debit: { accountName: '仕入', amount: 100000 },
      credit: { accountName: '現金', amount: 100000 },
    },
    correctLedgers: ['cash_book', 'purchase_journal'],
  },
  {
    id: 'sl_2',
    title: '掛け売上',
    description: '得意先A商店に商品200,000円を掛けで販売した。',
    hint: '売掛金が発生するので売掛金元帳、売上なので売上帳に記入します。',
    journalEntry: {
      debit: { accountName: '売掛金', amount: 200000 },
      credit: { accountName: '売上', amount: 200000 },
    },
    correctLedgers: ['sales_journal', 'accounts_receivable_ledger'],
  },
  {
    id: 'sl_3',
    title: '約束手形による仕入',
    description: '商品150,000円を仕入れ、約束手形を振り出した。',
    hint: '支払手形を振り出したので支払手形記入帳、仕入なので仕入帳に記入します。',
    journalEntry: {
      debit: { accountName: '仕入', amount: 150000 },
      credit: { accountName: '支払手形', amount: 150000 },
    },
    correctLedgers: ['purchase_journal', 'notes_payable_book'],
  },
  {
    id: 'sl_4',
    title: '売掛金の現金回収',
    description: '得意先B商店から売掛金80,000円を現金で回収した。',
    hint: '現金が動くので現金出納帳、売掛金が減少するので売掛金元帳に記入します。',
    journalEntry: {
      debit: { accountName: '現金', amount: 80000 },
      credit: { accountName: '売掛金', amount: 80000 },
    },
    correctLedgers: ['cash_book', 'accounts_receivable_ledger'],
  },
  {
    id: 'sl_5',
    title: '買掛金の手形決済',
    description: '仕入先C商店への買掛金120,000円について、約束手形を振り出して支払った。',
    hint: '支払手形を振り出したので支払手形記入帳、買掛金が減少するので買掛金元帳に記入します。',
    journalEntry: {
      debit: { accountName: '買掛金', amount: 120000 },
      credit: { accountName: '支払手形', amount: 120000 },
    },
    correctLedgers: ['notes_payable_book', 'accounts_payable_ledger'],
  },
  {
    id: 'sl_6',
    title: '手形の現金回収',
    description: '受取手形60,000円が満期となり、現金で回収した。',
    hint: '現金が動くので現金出納帳、受取手形が減少するので受取手形記入帳に記入します。',
    journalEntry: {
      debit: { accountName: '現金', amount: 60000 },
      credit: { accountName: '受取手形', amount: 60000 },
    },
    correctLedgers: ['cash_book', 'notes_receivable_book'],
  },
  {
    id: 'sl_7',
    title: '掛け仕入',
    description: '仕入先D商店から商品250,000円を掛けで仕入れた。',
    hint: '買掛金が発生するので買掛金元帳、仕入なので仕入帳に記入します。',
    journalEntry: {
      debit: { accountName: '仕入', amount: 250000 },
      credit: { accountName: '買掛金', amount: 250000 },
    },
    correctLedgers: ['purchase_journal', 'accounts_payable_ledger'],
  },
  {
    id: 'sl_8',
    title: '現金売上と手形受取',
    description: '商品300,000円を販売し、現金100,000円と約束手形200,000円を受け取った。',
    hint: '現金が動くので現金出納帳、受取手形を受け取ったので受取手形記入帳、売上なので売上帳に記入します。',
    journalEntry: {
      debit: { accountName: '現金・受取手形', amount: 300000 },
      credit: { accountName: '売上', amount: 300000 },
    },
    correctLedgers: ['cash_book', 'sales_journal', 'notes_receivable_book'],
  },
  {
    id: 'sl_9',
    title: '買掛金の現金支払い',
    description: '仕入先E商店への買掛金90,000円を現金で支払った。',
    hint: '現金が動くので現金出納帳、買掛金が減少するので買掛金元帳に記入します。',
    journalEntry: {
      debit: { accountName: '買掛金', amount: 90000 },
      credit: { accountName: '現金', amount: 90000 },
    },
    correctLedgers: ['cash_book', 'accounts_payable_ledger'],
  },
  {
    id: 'sl_10',
    title: '手形による売上',
    description: '商品180,000円を販売し、得意先振出の約束手形を受け取った。',
    hint: '受取手形を受け取ったので受取手形記入帳、売上なので売上帳に記入します。',
    journalEntry: {
      debit: { accountName: '受取手形', amount: 180000 },
      credit: { accountName: '売上', amount: 180000 },
    },
    correctLedgers: ['sales_journal', 'notes_receivable_book'],
  },
];
