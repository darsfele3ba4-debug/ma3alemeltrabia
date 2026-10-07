// ===== بيانات عامة =====
const SCHOOL = {
    name: "مدارس معالم التربية",
    nameEn: "Maalem Al Tarbeiah Schools",
    logo: "assets/img/logo.png",
    grade: "الرياضيات - الصف الرابع الابتدائى"
};

// تعريف الألعاب المتاحة
const GAME_DEFS = {
    mcq:     { title: "الاختيار من متعدد", sub: "15 سؤالًا لاختبار معلوماتك", icon: "fa-list-check", color: "from-blue-500 to-blue-600" },
    bubbles: { title: "الفقاعات المتساقطة", sub: "المس الفقاعة الصحيحة", icon: "fa-droplet", color: "from-cyan-500 to-cyan-600" },
    shoot:   { title: "التنشين المتحرك", sub: "صِد الهدف الصحيح المتحرك", icon: "fa-bullseye", color: "from-red-500 to-red-600" },
    tug:     { title: "شد الحبل", sub: "أجب صح واسحب الحبل لفريقك", icon: "fa-people-pulling", color: "from-amber-500 to-orange-600" },
    goal:    { title: "تسجيل الأهداف", sub: "اختر الزاوية الصحيحة وسجّل", icon: "fa-futbol", color: "from-emerald-500 to-green-700" },
    tf:      { title: "صح أم خطأ", sub: "حدد صحة العبارات", icon: "fa-check-double", color: "from-orange-500 to-orange-600" },
    match:   { title: "لعبة التوصيل", sub: "اربط بين العبارة وقيمتها", icon: "fa-link", color: "from-green-500 to-green-600" },
    fill:    { title: "أكمل الفراغ", sub: "اختر ما يكمل العبارة", icon: "fa-puzzle-piece", color: "from-purple-500 to-purple-600" }
};

const LESSONS = {
    "1": {
        title: "مهارة حل المسألة + الجمع", order: "الفصل الثانى: الجمع والطرح", color: "from-teal-600 to-cyan-800", icon: "fa-plus",
        games: ["goal", "tug", "tf", "match", "bubbles", "shoot"],
        tips: [
            "خطوات حل المسألة: افهم ← خطط ← حل ← تحقق",
            "إذا وردت كلمة (تقريبًا) فى المسألة فالمطلوب هو التقدير، وإلا فالمطلوب الإجابة الدقيقة.",
            "للتقدير نقرّب كل عدد ثم نجمع: $252 + 646 + 895$ ⟵ $300 + 600 + 900 = 1800$",
            "عند الجمع نبدأ بالآحاد، ثم العشرات، ثم المئات، ثم الألوف.",
            "إعادة التجميع: إذا زاد مجموع منزلة عن $9$ نعيد تجميعه، مثل: $7 + 5 = 12$ ⟵ عشرة واحدة و $2$ آحاد.",
            "$6824 + 349 = 7173$ ، والتقدير $7100$ قريب منه، إذن الإجابة معقولة ✓"
        ]
    }
};

// ===== عبارات التشجيع =====
const CHEERS = {
    ok: ["أحسنت يا بطل! 🌟", "ممتاز! استمر على هذا المستوى 👏", "رائع جدًا! إجابة ذكية 💡", "عبقرى! واصل التقدم 🚀",
         "برافو! أنت نجم الرياضيات ⭐", "إجابة موفقة .. نحن فخورون بك 🏅", "تفكير سليم وحساب دقيق ✔️", "مبدع! خطوة جديدة نحو القمة 🏆"],
    no: ["لا بأس .. المحاولة طريق النجاح 💪", "ركّز قليلًا وستنجح فى المرة القادمة 🌱", "خطأ بسيط .. راجع الحل وتعلّم منه 📘",
         "لا تستسلم! كل خطأ يعلّمنا شيئًا جديدًا ✨", "انتبه لإعادة التجميع والتقريب 🔍", "حاول مرة أخرى .. أنت قادر على ذلك 👍"]
};
let _lastCheer = {};
function cheer(ok) {
    const list = CHEERS[ok ? 'ok' : 'no'], key = ok ? 'ok' : 'no';
    let i; do { i = Math.floor(Math.random() * list.length); } while (list.length > 1 && i === _lastCheer[key]);
    _lastCheer[key] = i; return list[i];
}

// ===== تنسيق النصوص الرياضية =====
// $...$  => معادلة تُكتب من اليمين لليسار كما فى الكتاب
// {a/b}  => كسر رأسى (بسط فوق مقام)
// الأرقام تُعرض بالأرقام العربية (٠١٢٣٤٥٦٧٨٩)
function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function fracify(s) {
    return s.replace(/\{([^{}\/]+)\/([^{}]+)\}/g, '<span class="frac"><span class="num">$1</span><span class="den">$2</span></span>');
}
const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
function toAr(s) {
    return String(s).replace(/(\d)\.(\d)/g, "$1٫$2").replace(/[0-9]/g, d => AR_DIGITS[d]);
}
function fmt(raw) {
    let s = escapeHtml(raw);
    s = s.replace(/\$([^$]+)\$/g, (m, inner) => '<span class="eq">' + fracify(inner) + '</span>');
    return toAr(s);
}
