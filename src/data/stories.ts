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
  {
    id: 'chapter6',
    title: '第6章：手形と電子記録を使おう！',
    description: '約束手形や電子記録債権・債務の取引を学びます。',
    icon: '📝',
    transactions: [
      {
        id: 'ch6_t1',
        title: '手形で仕入れ',
        description: '商品60,000円を仕入れ、約束手形を振り出して支払いました。',
        story: '掛け取引よりもさらに信用力のある決済方法が「手形」です。約束手形を振り出して商品を仕入れました。手形を振り出すと「支払手形」という負債が発生します。',
        hint: '仕入（費用）が発生するので借方に、支払手形（負債）が増えるので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'purchases', amount: 60000 },
          credit: { accountId: 'notes_payable', amount: 60000 },
        },
      },
      {
        id: 'ch6_t2',
        title: '手形で売上',
        description: '商品90,000円を売り上げ、約束手形を受け取りました。',
        story: 'お得意先に商品を販売し、代金として約束手形を受け取りました。手形を受け取ると「受取手形」という資産が発生します。期日になれば現金化できます。',
        hint: '受取手形（資産）が増えるので借方に、売上（収益）が発生するので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'notes_receivable', amount: 90000 },
          credit: { accountId: 'sales', amount: 90000 },
        },
      },
      {
        id: 'ch6_t3',
        title: '電子記録債権の発生',
        description: '売掛金150,000円を電子記録債権に切り替えました。',
        story: '最近は紙の手形に代わり、電子的に記録する「電子記録債権」が増えています。売掛金を電子記録債権に切り替えることで、より確実に代金を回収できます。',
        hint: '電子記録債権（資産）が増えるので借方に、売掛金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'electronic_receivable', amount: 150000 },
          credit: { accountId: 'accounts_receivable', amount: 150000 },
        },
      },
      {
        id: 'ch6_t4',
        title: '電子記録債務の支払い',
        description: '電子記録債務100,000円を普通預金から支払いました。',
        story: '電子記録債務の支払期日が来ました。普通預金から自動的に引き落とされ、債務が消滅します。',
        hint: '電子記録債務（負債）が減るので借方に、普通預金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'electronic_payable', amount: 100000 },
          credit: { accountId: 'deposit', amount: 100000 },
        },
      },
    ],
  },
  {
    id: 'chapter7',
    title: '第7章：お金を借りよう！',
    description: '銀行からの借入れと返済、利息の受け取りを学びます。',
    icon: '🏦',
    transactions: [
      {
        id: 'ch7_t1',
        title: '銀行から借入',
        description: '銀行から500,000円を借り入れ、普通預金に入金されました。',
        story: 'お店を拡大するために資金が必要です。銀行から500,000円を借り入れました。お金（資産）が増えますが、同時に返さなければならない「借入金」（負債）も増えます。',
        hint: '普通預金（資産）が増えるので借方に、借入金（負債）が増えるので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'deposit', amount: 500000 },
          credit: { accountId: 'borrowing', amount: 500000 },
        },
      },
      {
        id: 'ch7_t2',
        title: '借入金の返済',
        description: '借入金200,000円を普通預金から返済しました。',
        story: '借入金の一部を返済する日が来ました。普通預金から200,000円を銀行に返します。負債が減り、資産も減ります。',
        hint: '借入金（負債）が減るので借方に、普通預金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'borrowing', amount: 200000 },
          credit: { accountId: 'deposit', amount: 200000 },
        },
      },
      {
        id: 'ch7_t3',
        title: '受取利息',
        description: '普通預金に利息1,200円が入金されました。',
        story: '銀行に預けているお金にも利息がつきます。今回は1,200円の利息が普通預金に入金されました。これは本業以外の収益「受取利息」です。',
        hint: '普通預金（資産）が増えるので借方に、受取利息（収益）が発生するので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'deposit', amount: 1200 },
          credit: { accountId: 'interest_income', amount: 1200 },
        },
      },
    ],
  },
  {
    id: 'chapter8',
    title: '第8章：前払い・前受けを学ぼう！',
    description: '商品の手付金（前払金・前受金）の処理を学びます。',
    icon: '🔄',
    transactions: [
      {
        id: 'ch8_t1',
        title: '前払金の支払い',
        description: '商品の手付金として30,000円を現金で支払いました。',
        story: '人気の雑貨を予約注文するため、手付金（内金）として30,000円を先に支払いました。まだ商品は届いていないので仕入ではなく「前払金」という資産になります。',
        hint: '前払金（資産）が増えるので借方に、現金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'prepaid', amount: 30000 },
          credit: { accountId: 'cash', amount: 30000 },
        },
      },
      {
        id: 'ch8_t2',
        title: '前受金の受取',
        description: '得意先から商品の手付金として50,000円を現金で受け取りました。',
        story: '大口のお客様から注文が入り、手付金として50,000円を先にいただきました。まだ商品を渡していないので売上ではなく「前受金」という負債になります。',
        hint: '現金（資産）が増えるので借方に、前受金（負債）が増えるので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'cash', amount: 50000 },
          credit: { accountId: 'unearned_revenue', amount: 50000 },
        },
      },
      {
        id: 'ch8_t3',
        title: '前受金の精算',
        description: '前受金のあった得意先に商品50,000円分を引き渡しました。',
        story: '注文の商品が揃い、お客様にお渡ししました。手付金としていただいていた前受金（負債）が消え、売上（収益）として確定します。',
        hint: '前受金（負債）が減るので借方に、売上（収益）が発生するので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'unearned_revenue', amount: 50000 },
          credit: { accountId: 'sales', amount: 50000 },
        },
      },
    ],
  },
  {
    id: 'chapter9',
    title: '第9章：いろいろな経費を払おう！',
    description: '通信費・消耗品費・旅費交通費・広告宣伝費などを学びます。',
    icon: '💳',
    transactions: [
      {
        id: 'ch9_t1',
        title: '通信費の支払い',
        description: '電話・インターネット代8,000円を普通預金から支払いました。',
        story: 'お店では電話やインターネットが欠かせません。今月の通信費8,000円を口座引き落としで支払いました。',
        hint: '通信費（費用）が発生するので借方に、普通預金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'communication', amount: 8000 },
          credit: { accountId: 'deposit', amount: 8000 },
        },
      },
      {
        id: 'ch9_t2',
        title: '消耗品の購入',
        description: '事務用品12,000円を現金で購入しました。',
        story: 'コピー用紙やボールペン、封筒などの事務用品を購入しました。すぐに使う消耗品は「消耗品費」として費用計上します。',
        hint: '消耗品費（費用）が発生するので借方に、現金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'supplies_expense', amount: 12000 },
          credit: { accountId: 'cash', amount: 12000 },
        },
      },
      {
        id: 'ch9_t3',
        title: '旅費交通費の支払い',
        description: '仕入先への出張交通費25,000円を現金で支払いました。',
        story: '新しい仕入先を開拓するため、遠方まで出張しました。電車代やタクシー代の合計25,000円を現金で支払いました。',
        hint: '旅費交通費（費用）が発生するので借方に、現金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'travel_expense', amount: 25000 },
          credit: { accountId: 'cash', amount: 25000 },
        },
      },
      {
        id: 'ch9_t4',
        title: '広告宣伝費の支払い',
        description: 'チラシ印刷代35,000円を普通預金から支払いました。',
        story: 'お店の知名度を上げるため、チラシを作って配布することにしました。印刷代35,000円は銀行振込で支払います。',
        hint: '広告宣伝費（費用）が発生するので借方に、普通預金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'advertising', amount: 35000 },
          credit: { accountId: 'deposit', amount: 35000 },
        },
      },
    ],
  },
  {
    id: 'chapter10',
    title: '第10章：仮払い・仮受けと立替え',
    description: '金額未確定の取引や立替払いの処理を学びます。',
    icon: '🔍',
    transactions: [
      {
        id: 'ch10_t1',
        title: '仮払金の支出',
        description: '従業員の出張のため、概算額30,000円を現金で渡しました。',
        story: '従業員が出張に行くので、旅費の概算として30,000円を前渡ししました。正確な金額は出張後に精算します。金額未確定なので「仮払金」として記録します。',
        hint: '仮払金（資産）が増えるので借方に、現金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'temporary_payment', amount: 30000 },
          credit: { accountId: 'cash', amount: 30000 },
        },
      },
      {
        id: 'ch10_t2',
        title: '仮受金の受取',
        description: '内容不明の入金40,000円が普通預金にありました。',
        story: '普通預金の通帳を確認すると、誰からかわからない40,000円の入金がありました。内容が判明するまで「仮受金」として処理しておきます。',
        hint: '普通預金（資産）が増えるので借方に、仮受金（負債）が増えるので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'deposit', amount: 40000 },
          credit: { accountId: 'temporary_receipt', amount: 40000 },
        },
      },
      {
        id: 'ch10_t3',
        title: '立替金の支払い',
        description: '従業員の生命保険料8,000円を現金で立て替えました。',
        story: '従業員が払うべき生命保険料を、一時的にお店のお金で立て替えました。後日、従業員から返してもらいます。',
        hint: '立替金（資産）が増えるので借方に、現金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'advance_to_employee', amount: 8000 },
          credit: { accountId: 'cash', amount: 8000 },
        },
      },
      {
        id: 'ch10_t4',
        title: '仮受金の判明',
        description: '仮受金40,000円は売掛金の回収であったことが判明しました。',
        story: '内容不明だった入金40,000円の正体がわかりました！得意先からの売掛金の支払いでした。仮受金（負債）を取り崩し、売掛金（資産）を減らします。',
        hint: '仮受金（負債）が減るので借方に、売掛金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'temporary_receipt', amount: 40000 },
          credit: { accountId: 'accounts_receivable', amount: 40000 },
        },
      },
    ],
  },
  {
    id: 'chapter11',
    title: '第11章：固定資産のいろいろ',
    description: '車両・土地の購入や備品の未払い購入、修繕などを学びます。',
    icon: '🏗️',
    transactions: [
      {
        id: 'ch11_t1',
        title: '車両の購入',
        description: '配達用の車両を500,000円で購入し、普通預金から支払いました。',
        story: '商品の配達のために軽トラックを購入しました。車両も備品と同じく固定資産です。長期間にわたって使うものなので資産として記録します。',
        hint: '車両運搬具（資産）が増えるので借方に、普通預金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'vehicles', amount: 500000 },
          credit: { accountId: 'deposit', amount: 500000 },
        },
      },
      {
        id: 'ch11_t2',
        title: '建物の修繕',
        description: '店舗の壁を修理し、修繕費45,000円を現金で支払いました。',
        story: '店舗の壁にヒビが入ってしまいました。業者に依頼して修理してもらい、代金45,000円を現金で支払いました。原状回復のための修理は「修繕費」（費用）です。',
        hint: '修繕費（費用）が発生するので借方に、現金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'repair_expense', amount: 45000 },
          credit: { accountId: 'cash', amount: 45000 },
        },
      },
      {
        id: 'ch11_t3',
        title: '土地の購入',
        description: '店舗用の土地を2,000,000円で購入し、普通預金から支払いました。',
        story: '将来のお店の拡大に備えて、隣の土地を購入しました。土地は減価償却しない特殊な固定資産です。購入代金は普通預金から支払いました。',
        hint: '土地（資産）が増えるので借方に、普通預金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'land', amount: 2000000 },
          credit: { accountId: 'deposit', amount: 2000000 },
        },
      },
      {
        id: 'ch11_t4',
        title: '未払金の発生',
        description: 'パソコン150,000円を購入し、代金は来月払いとしました。',
        story: '業務用のパソコンを購入しました。ただし代金はすぐには払わず、来月払いにしてもらいました。商品以外の後払いは「買掛金」ではなく「未払金」を使います。',
        hint: '備品（資産）が増えるので借方に、未払金（負債）が増えるので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'equipment', amount: 150000 },
          credit: { accountId: 'unpaid', amount: 150000 },
        },
      },
    ],
  },
  {
    id: 'chapter12',
    title: '第12章：税金・保険・手数料',
    description: '租税公課、保険料、受取手数料の取引を学びます。',
    icon: '🏛️',
    transactions: [
      {
        id: 'ch12_t1',
        title: '収入印紙の購入',
        description: '収入印紙5,000円を現金で購入しました。',
        story: '契約書に貼る収入印紙を購入しました。印紙税は「租税公課」という費用科目で処理します。税金関連の費用はここにまとめます。',
        hint: '租税公課（費用）が発生するので借方に、現金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'taxes_dues', amount: 5000 },
          credit: { accountId: 'cash', amount: 5000 },
        },
      },
      {
        id: 'ch12_t2',
        title: '保険料の支払い',
        description: '店舗の火災保険料36,000円を普通預金から支払いました。',
        story: '万が一の火災に備えて、火災保険に加入しました。年間保険料36,000円を普通預金から支払います。',
        hint: '保険料（費用）が発生するので借方に、普通預金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'insurance', amount: 36000 },
          credit: { accountId: 'deposit', amount: 36000 },
        },
      },
      {
        id: 'ch12_t3',
        title: '受取手数料',
        description: '仲介手数料15,000円を現金で受け取りました。',
        story: '知り合いのお店に商品の仕入先を紹介した手数料として、15,000円をいただきました。本業の売上とは別の収益「受取手数料」として処理します。',
        hint: '現金（資産）が増えるので借方に、受取手数料（収益）が発生するので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'cash', amount: 15000 },
          credit: { accountId: 'fee_income', amount: 15000 },
        },
      },
      {
        id: 'ch12_t4',
        title: '未収入金の発生',
        description: '不要になった備品を20,000円で売却し、代金は来月受け取ることにしました。',
        story: '使わなくなった棚を他のお店に売りました。代金は来月振り込んでもらいます。商品以外の売却代金の未回収分は「未収入金」という資産になります。',
        hint: '未収入金（資産）が増えるので借方に、備品（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'accrued_revenue', amount: 20000 },
          credit: { accountId: 'equipment', amount: 20000 },
        },
      },
    ],
  },
  {
    id: 'chapter13',
    title: '第13章：現金過不足と決算整理',
    description: '現金過不足の処理と決算時の経過勘定を学びます。',
    icon: '📋',
    transactions: [
      {
        id: 'ch13_t1',
        title: '現金過不足の発見（不足）',
        description: '現金の実際有高が帳簿残高より3,000円少ないことが判明しました。',
        story: '金庫の現金を数えてみたら、帳簿上の金額より3,000円足りません！原因はまだわからないので、とりあえず「現金過不足」として処理しておきます。',
        hint: '現金過不足（原因不明の差額）が借方に、現金（資産）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'cash_over_short', amount: 3000 },
          credit: { accountId: 'cash', amount: 3000 },
        },
      },
      {
        id: 'ch13_t2',
        title: '現金過不足の原因判明',
        description: '現金過不足3,000円の原因が通信費の記帳漏れと判明しました。',
        story: '調べた結果、3,000円の不足は電話代の支払いを記帳し忘れていたことが原因でした。現金過不足を取り崩して、正しい費用科目に振り替えます。',
        hint: '通信費（費用）が発生するので借方に、現金過不足が解消されるので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'communication', amount: 3000 },
          credit: { accountId: 'cash_over_short', amount: 3000 },
        },
      },
      {
        id: 'ch13_t3',
        title: '前払費用の計上',
        description: '支払家賃のうち24,000円が翌期分であると判明しました。',
        story: '決算日を迎え、支払済みの家賃を確認すると、24,000円分は翌期の家賃でした。当期の費用ではないので「前払費用」として資産に振り替えます。これが「経過勘定」です。',
        hint: '前払費用（資産）が増えるので借方に、支払家賃（費用）が減るので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'prepaid_expense', amount: 24000 },
          credit: { accountId: 'rent', amount: 24000 },
        },
      },
      {
        id: 'ch13_t4',
        title: '未払費用の計上',
        description: '当期分の利息2,000円がまだ未払いであることが判明しました。',
        story: '決算にあたり、借入金の利息を計算すると、当期に属する利息2,000円がまだ支払われていませんでした。当期の費用として「未払費用」を計上します。',
        hint: '支払利息（費用）が発生するので借方に、未払費用（負債）が増えるので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'interest_expense', amount: 2000 },
          credit: { accountId: 'accrued_expense', amount: 2000 },
        },
      },
      {
        id: 'ch13_t5',
        title: '未収収益の計上',
        description: '当期分の受取利息800円がまだ未収であることが判明しました。',
        story: '決算にあたり、定期預金の利息を計算すると、当期に属する利息800円がまだ入金されていませんでした。当期の収益として「未収収益」を計上します。',
        hint: '未収収益（資産）が増えるので借方に、受取利息（収益）が発生するので貸方に置きます。',
        correctEntry: {
          debit: { accountId: 'accrued_income', amount: 800 },
          credit: { accountId: 'interest_income', amount: 800 },
        },
      },
    ],
  },
];