import { StoryChapter } from '@/types';

export const storyChapters: StoryChapter[] = [
  {
    id: 'chapter1',
    title: '第1章：お店を開こう！',
    description: '会計の基本を学びながら、あなただけのお店をオープンしましょう。',
    icon: '🏪',
    transactions: [
      {
        id: 'ch1_t1',
        title: '元手を出す',
        description: 'お店を始めるために、オーナーが現金500,000円を出資しました。',
        story: 'あなたは夢だった雑貨屋さんを開くことにしました。まずは自分の貯金から500,000円を元手としてお店に入れます。これが「資本金」です。会社の財産（資産）が増え、同時にオーナーの持ち分（純資産）も増えます。',
        hint: 'お金（現金）が増えるので借方に現金、オーナーの持ち分（資本金）が増えるので貸方に資本金を置きます。',
        correctEntry: {
          debit: { accountId: 'cash', amount: 500000 },
          credit: { accountId: 'capital', amount: 500000 },
        },
      },
      {
        id: 'ch1_t2',
        title: '銀行口座を開設',
        description: '現金300,000円を銀行に預けました。',
        story: 'すべてのお金を手元に置いておくのは危険です。300,000円を銀行の普通預金口座に預けました。現金が減り、代わりに預金が増えます。どちらも「資産」ですが、形が変わっただけです。',
        hint: '預金（資産）が増えるので借方に、現金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'deposit', amount: 300000 },
          credit: { accountId: 'cash', amount: 300000 },
        },
      },
      {
        id: 'ch1_t3',
        title: '備品を購入',
        description: 'レジやディスプレイ棚などの備品を現金100,000円で購入しました。',
        story: 'お店には什器が必要です。レジスターやディスプレイ棚を100,000円で購入しました。手元の現金は減りますが、代わりに備品という資産が増えます。',
        hint: '備品（資産）が増えるので借方に、現金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'equipment', amount: 100000 },
          credit: { accountId: 'cash', amount: 100000 },
        },
      },
    ],
  },
  {
    id: 'chapter2',
    title: '第2章：商品を仕入れよう！',
    description: '商品の仕入れと支払い方法について学びます。',
    icon: '📦',
    transactions: [
      {
        id: 'ch2_t1',
        title: '現金で仕入れ',
        description: '雑貨を現金50,000円で仕入れました。',
        story: 'お店に並べる雑貨を問屋さんから仕入れました。代金50,000円はその場で現金払いです。仕入は「費用」なので、発生したら借方に記入します。',
        hint: '仕入（費用）が発生するので借方に、現金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'purchases', amount: 50000 },
          credit: { accountId: 'cash', amount: 50000 },
        },
      },
      {
        id: 'ch2_t2',
        title: '掛けで仕入れ',
        description: '追加の商品80,000円分を掛け（ツケ）で仕入れました。',
        story: 'もっと品揃えを増やしたいけど手持ちの現金が不安…。そんな時は「掛け」で仕入れます。後日支払う約束で商品を受け取ります。「買掛金」という負債が発生します。',
        hint: '仕入（費用）が発生するので借方に、買掛金（負債）が増えるので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'purchases', amount: 80000 },
          credit: { accountId: 'accounts_payable', amount: 80000 },
        },
      },
      {
        id: 'ch2_t3',
        title: '買掛金の支払い',
        description: '先日の買掛金80,000円を普通預金から支払いました。',
        story: '仕入先への支払期日が来ました。銀行の普通預金から80,000円を振り込みます。負債（買掛金）が減り、資産（預金）も減ります。',
        hint: '買掛金（負債）が減るので借方に、普通預金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'accounts_payable', amount: 80000 },
          credit: { accountId: 'deposit', amount: 80000 },
        },
      },
    ],
  },
  {
    id: 'chapter3',
    title: '第3章：商品を売ろう！',
    description: '売上の記録と代金の回収方法を学びます。',
    icon: '💰',
    transactions: [
      {
        id: 'ch3_t1',
        title: '現金売上',
        description: '商品を120,000円で現金販売しました。',
        story: 'お客さんが来店！雑貨を気に入ってくれて、120,000円分を購入してくれました。現金をもらったので資産が増え、売上（収益）も発生します。',
        hint: '現金（資産）が増えるので借方に、売上（収益）が発生するので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'cash', amount: 120000 },
          credit: { accountId: 'sales', amount: 120000 },
        },
      },
      {
        id: 'ch3_t2',
        title: '掛け売上',
        description: '法人のお客様に商品200,000円を掛けで販売しました。',
        story: '近所の会社から大量注文が入りました！ただし支払いは来月末。まだ現金はもらえませんが、「売掛金」という権利（資産）が発生します。',
        hint: '売掛金（資産）が増えるので借方に、売上（収益）が発生するので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'accounts_receivable', amount: 200000 },
          credit: { accountId: 'sales', amount: 200000 },
        },
      },
      {
        id: 'ch3_t3',
        title: '売掛金の回収',
        description: '売掛金200,000円が普通預金に振り込まれました。',
        story: '来月末になり、法人のお客様から代金が振り込まれました！売掛金（もらう権利）が消え、代わりに預金（実際のお金）が増えます。',
        hint: '普通預金（資産）が増えるので借方に、売掛金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'deposit', amount: 200000 },
          credit: { accountId: 'accounts_receivable', amount: 200000 },
        },
      },
    ],
  },
  {
    id: 'chapter4',
    title: '第4章：経費を払おう！',
    description: 'お店を運営するための各種費用について学びます。',
    icon: '🧾',
    transactions: [
      {
        id: 'ch4_t1',
        title: '家賃の支払い',
        description: '今月の家賃60,000円を普通預金から支払いました。',
        story: 'お店の家賃は毎月払わなければいけません。60,000円を銀行振込で支払いました。家賃は「費用」として計上します。',
        hint: '支払家賃（費用）が発生するので借方に、普通預金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'rent', amount: 60000 },
          credit: { accountId: 'deposit', amount: 60000 },
        },
      },
      {
        id: 'ch4_t2',
        title: '給料の支払い',
        description: 'アルバイトの給料150,000円を現金で支払いました。',
        story: 'アルバイトさんが頑張ってくれたので、お給料を現金で手渡します。人件費はお店の大きな費用の一つです。',
        hint: '給料（費用）が発生するので借方に、現金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'salary', amount: 150000 },
          credit: { accountId: 'cash', amount: 150000 },
        },
      },
      {
        id: 'ch4_t3',
        title: '水道光熱費の支払い',
        description: '電気・ガス・水道代の合計15,000円を普通預金から支払いました。',
        story: 'お店を運営するにはライフラインが必要です。今月の光熱費を口座引き落としで支払いました。',
        hint: '水道光熱費（費用）が発生するので借方に、普通預金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'utilities', amount: 15000 },
          credit: { accountId: 'deposit', amount: 15000 },
        },
      },
    ],
  },
  {
    id: 'chapter5',
    title: '第5章：決算をしよう！',
    description: '減価償却と財務諸表の作成を学びます。',
    icon: '📊',
    transactions: [
      {
        id: 'ch5_t1',
        title: '減価償却',
        description: '備品100,000円の減価償却費を20,000円計上します（定額法・耐用年数5年）。',
        story: '期末になりました。備品は使ううちに価値が下がります。100,000円の備品を5年で使い切ると考え、1年分の20,000円を費用として計上します。これが「減価償却」です。',
        hint: '減価償却費（費用）が発生するので借方に、備品（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'depreciation', amount: 20000 },
          credit: { accountId: 'equipment', amount: 20000 },
        },
      },
      {
        id: 'ch5_t2',
        title: '借入金の利息',
        description: '借入金に対する利息5,000円を普通預金から支払いました。',
        story: '銀行からの借入金がある場合、利息を支払う必要があります。今回は5,000円の利息を口座から支払いました。',
        hint: '支払利息（費用）が発生するので借方に、普通預金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'interest_expense', amount: 5000 },
          credit: { accountId: 'deposit', amount: 5000 },
        },
      },
    ],
  },
];
