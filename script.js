// ========== المتغيرات العامة ==========
let isScreenLocked = false;
let currentTeacherPage = 1;
let currentStudentPage = 1;
let currentSubject = 'arabic';
let currentTeacherSubject = 'arabic';
let currentStudentSubject = 'arabic';
let totalPages = 200;
let currentExam = null;
let studentAnswers = {};
let currentGame = null;
let selectedModalAnswer = null;
let scheduleData = {};
let exams = [];
let submittedExams = [];
let homeworkList = [];
let announcements = [];

// محتوى الكتب المدرسية (فعلي لكل مادة)
const booksData = {
    arabic: {
        title: 'اللغة العربية - لغتي الجميلة',
        pages: {
            1: { title: 'المقدمة', content: '<h3>بسم الله الرحمن الرحيم</h3><p>مرحباً بكم في كتاب اللغة العربية. هذا الكتاب يهدف إلى تعليم اللغة العربية بطريقة مبسطة وممتعة.</p><h4>أهداف الوحدة الأولى:</h4><ul><li>تعلم القراءة والكتابة</li><li>فهم النصوص الأدبية</li><li>إتقان قواعد اللغة</li></ul>' },
            2: { title: 'درس: حرف الألف', content: '<h3>حرف الألف</h3><p>الألف هو أول حروف اللغة العربية. يخرج من الجوف. أمثلة: أَسَد، أَرْنَب، أَنْف.</p><div class="example"><strong>تمرين:</strong> اكتب ثلاثة كلمات تبدأ بحرف الألف.</div>' },
            3: { title: 'درس: حرف الباء', content: '<h3>حرف الباء</h3><p>الباء من الحروف الشفوية. أمثلة: بَطَّة، بَيْت، بَاب.</p><div class="example"><strong>تمرين:</strong> اكتب ثلاثة كلمات تبدأ بحرف الباء.</div>' },
            4: { title: 'قصة: الأسد والفأر', content: '<h3>قصة الأسد والفأر</h3><p>كان يا مكان في قديم الزمان، أسد قوي يعيش في الغابة... وأثناء نومه، وقع فأر صغير على جسده...</p><p><strong>العبرة:</strong> لا تستهن بأحد، فكل مخلوق له قيمة.</p>' },
            5: { title: 'قواعد: أنواع الكلمة', content: '<h3>أنواع الكلمة في اللغة العربية</h3><ul><li><strong>اسم:</strong> ما دل على شيء مثل: كتاب، شجرة</li><li><strong>فعل:</strong> ما دل على حدث مثل: كتب، يكتب</li><li><strong>حرف:</strong> ما دل على معنى في غيره مثل: في، على</li></ul>' }
        }
    },
    math: {
        title: 'الرياضيات - الرياضيات الممتعة',
        pages: {
            1: { title: 'مقدمة في الرياضيات', content: '<h3>مرحباً في عالم الرياضيات</h3><p>الرياضيات هي لغة العلوم. سنتعلم فيها الأعداد والعمليات الحسابية والأشكال الهندسية.</p>' },
            2: { title: 'الأعداد من 1 إلى 10', content: '<h3>الأعداد من 1 إلى 10</h3><p>١، ٢، ٣، ٤، ٥، ٦، ٧، ٨، ٩، ١٠</p><div class="example"><strong>تمرين:</strong> كم عدد أصابع يديك؟</div>' },
            3: { title: 'الجمع', content: '<h3>عملية الجمع</h3><p>الجمع هو إضافة عدد إلى آخر. مثال: ٢ + ٣ = ٥</p><div class="example"><strong>تمرين:</strong> ٤ + ٢ = ؟</div>' },
            4: { title: 'الطرح', content: '<h3>عملية الطرح</h3><p>الطرح هو إزالة عدد من آخر. مثال: ٥ - ٢ = ٣</p><div class="example"><strong>تمرين:</strong> ٧ - ٣ = ؟</div>' },
            5: { title: 'الأشكال الهندسية', content: '<h3>الأشكال الهندسية الأساسية</h3><ul><li>المربع: له ٤ أضلاع متساوية</li><li>الدائرة: ليس لها زوايا</li><li>المثلث: له ٣ أضلاع</li><li>المستطيل: له ٤ أضلاع، كل ضلعين متقابلين متساويين</li></ul>' }
        }
    },
    science: {
        title: 'العلوم - اكتشف العالم',
        pages: {
            1: { title: 'مقدمة في العلوم', content: '<h3>مرحباً في عالم العلوم</h3><p>العلوم تشرح لنا كيف يعمل العالم من حولنا. سنتعلم عن الحيوانات والنباتات والفضاء.</p>' },
            2: { title: 'الحيوانات الأليفة', content: '<h3>الحيوانات الأليفة</h3><p>الحيوانات الأليفة هي التي تعيش مع الإنسان مثل: القط، الكلب، الأرنب، الحمام.</p><div class="example"><strong>نشاط:</strong> هل لديك حيوان أليف في المنزل؟</div>' },
            3: { title: 'الحيوانات المفترسة', content: '<h3>الحيوانات المفترسة</h3><p>الحيوانات المفترسة هي التي تفترس غيرها للطعام مثل: الأسد، النمر، الذئب.</p>' },
            4: { title: 'النباتات', content: '<h3>النباتات حولنا</h3><p>النباتات تمدنا بالأكسجين والغذاء. أنواع النباتات: الأشجار، الأزهار، الأعشاب.</p>' },
            5: { title: 'الفضاء', content: '<h3>الفضاء الواسع</h3><p>الفضاء هو كل ما هو خارج الأرض. فيه الشمس والقمر والنجوم والكواكب.</p>' }
        }
    },
    islamic: {
        title: 'التربية الإسلامية - نور الإسلام',
        pages: {
            1: { title: 'سورة الفاتحة', content: '<h3>سورة الفاتحة</h3><p>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ (1) الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ (2) الرَّحْمَٰنِ الرَّحِيمِ (3) مَالِكِ يَوْمِ الدِّينِ (4) إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ (5) اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ (6) صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ (7)</p>' },
            2: { title: 'أركان الإسلام', content: '<h3>أركان الإسلام الخمسة</h3><ul><li>شهادة أن لا إله إلا الله وأن محمداً رسول الله</li><li>إقام الصلاة</li><li>إيتاء الزكاة</li><li>صوم رمضان</li><li>حج البيت لمن استطاع إليه سبيلاً</li></ul>' },
            3: { title: 'الوضوء', content: '<h3>كيفية الوضوء</h3><ol><li>النية</li><li>غسل الكفين ثلاثاً</li><li>المضمضة والاستنشاق</li><li>غسل الوجه ثلاثاً</li><li>غسل اليدين إلى المرفقين ثلاثاً</li><li>مسح الرأس والأذنين</li><li>غسل الرجلين إلى الكعبين ثلاثاً</li></ol>' }
        }
    },
    english: {
        title: 'English Language - Let\'s Learn',
        pages: {
            1: { title: 'Introduction', content: '<h3>Welcome to English</h3><p>Let\'s learn English together! English is a global language.</p>' },
            2: { title: 'Alphabet', content: '<h3>The English Alphabet</h3><p>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p><div class="example"><strong>Exercise:</strong> Sing the alphabet song!</div>' },
            3: { title: 'Greetings', content: '<h3>Greetings in English</h3><ul><li>Hello! - مرحباً</li><li>Good morning! - صباح الخير</li><li>Good afternoon! - مساء الخير</li><li>How are you? - كيف حالك؟</li><li>I\'m fine, thank you - أنا بخير، شكراً</li></ul>' }
        }
    }
};

// الجدول الدراسي (قابل للتعديل من المعلم)
let defaultSchedule = {
    Sunday: { periods: [{ time: "08:00", subject: "الرياضيات" }, { time: "09:30", subject: "العلوم" }] },
    Monday: { periods: [{ time: "08:00", subject: "اللغة العربية" }, { time: "09:30", subject: "اللغة الإنجليزية" }] },
    Tuesday: { periods: [{ time: "08:00", subject: "العلوم" }, { time: "09:30", subject: "الرياضيات" }] },
    Wednesday: { periods: [{ time: "08:00", subject: "التربية الإسلامية" }, { time: "09:30", subject: "اللغة العربية" }] },
    Thursday: { periods: [{ time: "08:00", subject: "الاجتماعيات" }, { time: "09:30", subject: "التربية الفنية" }] }
};

// ========== دوال عامة ==========
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.style.backgroundColor = isError ? 'var(--danger)' : 'var(--teacher-primary)';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

function updateCurrentLesson() {
    const now = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = dayNames[now.getDay()];
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = `${currentHour.toString().padStart(2,'0')}:${currentMinute.toString().padStart(2,'0')}`;
    
    const schedule = JSON.parse(localStorage.getItem('scheduleData')) || defaultSchedule;
    const daySchedule = schedule[currentDay];
    let currentLesson = null;
    let nextLesson = null;
    
    if (daySchedule) {
        for (let i = 0; i < daySchedule.periods.length; i++) {
            const period = daySchedule.periods[i];
            if (currentTime >= period.time) {
                currentLesson = period;
                if (i + 1 < daySchedule.periods.length) nextLesson = daySchedule.periods[i + 1];
            }
        }
    }
    
    const currentLessonBox = document.getElementById('currentLessonBox');
    if (currentLessonBox) {
        if (currentLesson) currentLessonBox.innerHTML = `<i class="fas fa-chalkboard"></i> ${currentLesson.subject} - الساعة ${currentLesson.time}`;
        else currentLessonBox.innerHTML = `<i class="fas fa-coffee"></i> لا توجد حصة الآن - وقت راحة`;
    }
    
    const nextLessonBox = document.getElementById('nextLessonBox');
    if (nextLessonBox) {
        if (nextLesson) nextLessonBox.innerHTML = `<i class="fas fa-bell"></i> الحصة القادمة: ${nextLesson.subject} الساعة ${nextLesson.time}`;
        else nextLessonBox.innerHTML = `<i class="fas fa-check"></i> انتهت الحصص لهذا اليوم`;
    }
}

// ========== دوال المعلم ==========
function toggleScreenLock() {
    isScreenLocked = !isScreenLocked;
    const overlay = document.getElementById('lockOverlay');
    if (overlay) overlay.style.display = isScreenLocked ? 'flex' : 'none';
    showToast(isScreenLocked ? '🔒 تم قفل شاشات الطلاب' : '🔓 تم فتح شاشات الطلاب');
}

function pushBookToStudents() {
    const alertBox = document.getElementById('studentAlert');
    if (alertBox) {
        alertBox.innerHTML = `<i class="fas fa-book"></i><span>📖 المعلم يطلب فتح الكتاب - ${booksData[currentTeacherSubject].title}</span>`;
        setTimeout(() => {
            if (alertBox) alertBox.innerHTML = '<i class="fas fa-info-circle"></i><span>لا توجد أوامر حالية</span>';
        }, 8000);
    }
    showToast('📖 تم إرسال أمر فتح الكتاب للطلاب');
}

function sendInstantQuestion() {
    const question = prompt('اكتب السؤال الذي تريد إرساله للطلاب:');
    if (!question) return;
    const alertBox = document.getElementById('studentAlert');
    if (alertBox) {
        alertBox.innerHTML = `<i class="fas fa-question-circle"></i><span>❓ سؤال من المعلم: ${question}</span>`;
        setTimeout(() => {
            if (alertBox && alertBox.innerHTML.includes('سؤال من المعلم')) alertBox.innerHTML = '<i class="fas fa-info-circle"></i><span>لا توجد أوامر حالية</span>';
        }, 30000);
    }
    showToast('❓ تم إرسال السؤال للطلاب');
}

function sendHomework() {
    const homework = prompt('اكتب الواجب الذي تريد إرساله:');
    if (!homework) return;
    homeworkList.unshift({ id: Date.now(), text: homework, due: new Date().toLocaleDateString('ar-EG'), solved: false });
    localStorage.setItem('homeworkList', JSON.stringify(homeworkList));
    updateHomeworkList();
    showToast('📤 تم إرسال الواجب للطلاب');
}

function takeAttendance() {
    const count = Math.floor(Math.random() * (30 - 20 + 1)) + 20;
    showToast(`✅ تم تحضير ${count} طالباً بنجاح`);
}

function showStudentList() {
    showToast('📋 قائمة الطلاب: أحمد، محمد، فاطمة، نور، سارة... (24 طالباً)');
}

function broadcastMessage() {
    const message = prompt('اكتب الرسالة التي تريد إرسالها لجميع الطلاب:');
    if (!message) return;
    announcements.unshift({ id: Date.now(), text: message, date: new Date().toLocaleDateString('ar-EG') });
    updateAnnouncements();
    showToast('📢 تم إرسال الرسالة للطلاب');
}

// دوال الكتاب للمعلم
function changeTeacherBook() {
    const select = document.getElementById('teacherSubjectSelect');
    if (select) currentTeacherSubject = select.value;
    displayTeacherBook();
}

function displayTeacherBook() {
    const book = booksData[currentTeacherSubject];
    if (!book) return;
    const page = book.pages[currentTeacherPage];
    if (!page) return;
    const container = document.getElementById('teacherBookContent');
    if (container) {
        container.innerHTML = `<div class="book-page"><h3>${page.title}</h3>${page.content}<p class="text-muted" style="margin-top:20px">الصفحة ${currentTeacherPage} من ${totalPages}</p></div>`;
    }
    const pageSpan = document.getElementById('teacherPageNum');
    if (pageSpan) pageSpan.textContent = `الصفحة ${currentTeacherPage} من ${totalPages}`;
}

function teacherBookPrev() {
    if (currentTeacherPage > 1) { currentTeacherPage--; displayTeacherBook(); }
    else showToast('أنت في الصفحة الأولى');
}

function teacherBookNext() {
    if (currentTeacherPage < totalPages) { currentTeacherPage++; displayTeacherBook(); }
    else showToast('أنت في الصفحة الأخيرة');
}

function closeTeacherBook() {
    const container = document.getElementById('teacherBookContent');
    if (container) container.innerHTML = '<div class="book-page"><h3>الكتاب مغلق</h3><p>اضغط على تبويب الكتاب لإعادة فتحه</p></div>';
}

function sendCurrentPageToStudents() {
    currentStudentPage = currentTeacherPage;
    currentStudentSubject = currentTeacherSubject;
    displayStudentBook();
    showToast(`📖 تم إرسال الصفحة ${currentTeacherPage} من كتاب ${booksData[currentTeacherSubject].title} للطلاب`);
}

// دوال الاختبارات
let currentExamQuestions = [];

function toggleQuestionOptions() {
    const type = document.getElementById('questionType').value;
    const mcqDiv = document.getElementById('mcqOptionsGroup');
    if (mcqDiv) mcqDiv.style.display = type === 'mcq' ? 'block' : 'none';
}

function addQuestionToExam() {
    const title = document.getElementById('examTitle').value;
    const subject = document.getElementById('examSubject').value;
    const type = document.getElementById('questionType').value;
    const correctAnswer = document.getElementById('correctAnswer').value;
    const questionText = document.getElementById('questionText').value;
    let options = [];
    
    if (type === 'mcq') {
        const choices = document.getElementById('mcqChoices').value;
        options = choices.split(',').map(s => s.trim());
    }
    
    if (!questionText || !correctAnswer) {
        showToast('⚠️ يرجى إدخال السؤال والإجابة الصحيحة', true);
        return;
    }
    
    currentExamQuestions.push({ id: Date.now(), text: questionText, type, options, correctAnswer, subject });
    updateExamQuestionsList();
    document.getElementById('questionText').value = '';
    document.getElementById('correctAnswer').value = '';
    if (document.getElementById('mcqChoices')) document.getElementById('mcqChoices').value = '';
    showToast('✅ تم إضافة السؤال');
}

function updateExamQuestionsList() {
    const container = document.getElementById('examQuestionsList');
    if (!container) return;
    if (currentExamQuestions.length === 0) {
        container.innerHTML = '<p class="text-muted">لا توجد أسئلة مضافة بعد</p>';
        return;
    }
    container.innerHTML = currentExamQuestions.map((q, i) => `
        <div class="question-item">
            <div class="question-header">
                <strong>السؤال ${i+1}</strong>
                <span class="correct-badge">${q.type === 'mcq' ? 'اختيار من متعدد' : q.type === 'truefalse' ? 'صح/خطأ' : 'مقالي'}</span>
                <button class="btn btn-sm btn-danger" onclick="removeQuestion(${q.id})">حذف</button>
            </div>
            <div class="question-text-display">${q.text}</div>
            ${q.options ? `<div class="question-options-display">${q.options.map(opt => `<span class="option-display">${opt}</span>`).join('')}</div>` : ''}
            <div class="correct-badge">الإجابة: ${q.correctAnswer}</div>
        </div>
    `).join('');
}

function removeQuestion(id) {
    currentExamQuestions = currentExamQuestions.filter(q => q.id !== id);
    updateExamQuestionsList();
    showToast('🗑️ تم حذف السؤال');
}

function publishExam() {
    const title = document.getElementById('examTitle').value;
    if (!title) { showToast('⚠️ يرجى إدخال عنوان الاختبار', true); return; }
    if (currentExamQuestions.length === 0) { showToast('⚠️ يرجى إضافة أسئلة للاختبار', true); return; }
    
    const exam = { id: Date.now(), title, subject: document.getElementById('examSubject').value, questions: [...currentExamQuestions], published: new Date().toLocaleDateString('ar-EG') };
    exams.push(exam);
    localStorage.setItem('exams', JSON.stringify(exams));
    updateStudentExamsList();
    updatePreviousExamsList();
    showToast('📝 تم نشر الاختبار للطلاب');
    currentExamQuestions = [];
    updateExamQuestionsList();
    document.getElementById('examTitle').value = '';
}

function updateStudentExamsList() {
    const container = document.getElementById('studentExamsList');
    if (!container) return;
    const availableExams = exams.filter(e => !submittedExams.some(se => se.examId === e.id));
    if (availableExams.length === 0) { container.innerHTML = '<p class="text-muted">لا توجد اختبارات متاحة حالياً</p>'; return; }
    container.innerHTML = availableExams.map(e => `
        <div class="exam-item">
            <div class="exam-header"><strong>${e.title}</strong><span>${e.subject}</span><span>${e.published}</span></div>
            <div>عدد الأسئلة: ${e.questions.length}</div>
            <button class="btn btn-primary btn-sm" onclick="startExam(${e.id})">بدء الاختبار</button>
        </div>
    `).join('');
}

function updatePreviousExamsList() {
    const container = document.getElementById('previousExamsList');
    if (!container) return;
    if (exams.length === 0) { container.innerHTML = '<p class="text-muted">لا توجد اختبارات سابقة</p>'; return; }
    container.innerHTML = exams.map(e => `
        <div class="exam-item">
            <div class="exam-header"><strong>${e.title}</strong><span>${e.published}</span></div>
            <div>عدد الأسئلة: ${e.questions.length}</div>
        </div>
    `).join('');
}

function startExam(examId) {
    currentExam = exams.find(e => e.id === examId);
    if (!currentExam) return;
    studentAnswers = {};
    const modal = document.getElementById('examModal');
    const title = document.getElementById('examModalTitle');
    if (title) title.innerHTML = `<i class="fas fa-file-alt"></i> ${currentExam.title}`;
    const body = document.getElementById('examModalBody');
    if (body) {
        body.innerHTML = currentExam.questions.map((q, i) => `
            <div class="question-item" data-qid="${q.id}">
                <strong>السؤال ${i+1}:</strong> ${q.text}<br>
                ${q.type === 'mcq' ? q.options.map(opt => `<label style="display:block; margin:8px 0"><input type="radio" name="q${q.id}" value="${opt}"> ${opt}</label>`).join('') : ''}
                ${q.type === 'truefalse' ? `<label style="display:block; margin:8px 0"><input type="radio" name="q${q.id}" value="صح"> صح</label><label style="display:block; margin:8px 0"><input type="radio" name="q${q.id}" value="خطأ"> خطأ</label>` : ''}
                ${q.type === 'essay' ? `<textarea class="form-input" name="q${q.id}" rows="3" placeholder="اكتب إجابتك هنا..."></textarea>` : ''}
            </div>
        `).join('');
    }
    modal.style.display = 'flex';
}

function submitExamAnswers() {
    const inputs = document.querySelectorAll('#examModalBody input, #examModalBody textarea');
    inputs.forEach(input => {
        const name = input.name;
        const value = input.type === 'radio' ? (input.checked ? input.value : null) : input.value;
        if (value) studentAnswers[name] = value;
    });
    
    let score = 0;
    currentExam.questions.forEach(q => {
        if (studentAnswers[`q${q.id}`] === q.correctAnswer) score++;
    });
    
    submittedExams.push({ examId: currentExam.id, score: score, total: currentExam.questions.length, date: new Date().toLocaleDateString('ar-EG') });
    localStorage.setItem('submittedExams', JSON.stringify(submittedExams));
    showToast(`✅ تم تسليم الاختبار! درجتك: ${score}/${currentExam.questions.length}`);
    closeExamModal();
    updateStudentExamsList();
    updateGradesHistory();
}

function closeExamModal() {
    document.getElementById('examModal').style.display = 'none';
    currentExam = null;
}

function loadSubmissions() {
    const select = document.getElementById('examToCorrect');
    if (!select) return;
    const container = document.getElementById('submissionsList');
    if (container) container.innerHTML = '<p class="text-muted">اختر اختباراً لعرض إجابات الطلاب</p>';
}

function updateGradesHistory() {
    const container = document.getElementById('gradesHistory');
    if (!container) return;
    if (submittedExams.length === 0) { container.innerHTML = '<p class="text-muted">لا توجد درجات مسجلة بعد</p>'; return; }
    container.innerHTML = submittedExams.map(s => `<div class="exam-item"><strong>الاختبار:</strong> ${s.examId}<br><strong>الدرجة:</strong> ${s.score}/${s.total}<br><strong>التاريخ:</strong> ${s.date}</div>`).join('');
}

// دوال الجدول
function saveSchedule() {
    const editor = document.getElementById('scheduleEditor');
    if (!editor) return;
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    const newSchedule = {};
    days.forEach(day => {
        const periods = [];
        const times = document.querySelectorAll(`.schedule-time-${day}`);
        const subjects = document.querySelectorAll(`.schedule-subject-${day}`);
        for (let i = 0; i < times.length; i++) {
            if (times[i] && subjects[i]) periods.push({ time: times[i].value, subject: subjects[i].value });
        }
        newSchedule[day] = { periods };
    });
    localStorage.setItem('scheduleData', JSON.stringify(newSchedule));
    updateScheduleDisplay();
    updateCurrentLesson();
    showToast('✅ تم حفظ الجدول');
}

function resetSchedule() {
    localStorage.removeItem('scheduleData');
    updateScheduleDisplay();
    updateCurrentLesson();
    showToast('🔄 تم إعادة تعيين الجدول');
}

function updateScheduleDisplay() {
    const container = document.getElementById('scheduleDisplay');
    if (!container) return;
    const schedule = JSON.parse(localStorage.getItem('scheduleData')) || defaultSchedule;
    const dayNames = { Sunday: 'الأحد', Monday: 'الإثنين', Tuesday: 'الثلاثاء', Wednesday: 'الأربعاء', Thursday: 'الخميس' };
    container.innerHTML = Object.entries(schedule).map(([day, data]) => `
        <div class="schedule-day"><strong>${dayNames[day]}:</strong> ${data.periods.map(p => `${p.subject} (${p.time})`).join(' - ')}</div>
    `).join('');
}

// دوال الطالب
function openStudentBook() {
    const tab = document.querySelector('#studentTabs button[data-tab="student-book"]');
    if (tab) tab.click();
}

function changeStudentBook() {
    const select = document.getElementById('studentSubjectSelect');
    if (select) currentStudentSubject = select.value;
    displayStudentBook();
}

function displayStudentBook() {
    const book = booksData[currentStudentSubject];
    if (!book) return;
    const page = book.pages[currentStudentPage];
    if (!page) return;
    const container = document.getElementById('studentBookContent');
    if (container) {
        container.innerHTML = `<div class="book-page"><h3>${page.title}</h3>${page.content}<p class="text-muted" style="margin-top:20px">الصفحة ${currentStudentPage} من ${totalPages}</p></div>`;
    }
    const pageSpan = document.getElementById('studentPageNum');
    if (pageSpan) pageSpan.textContent = `الصفحة ${currentStudentPage} من ${totalPages}`;
}

function studentBookPrev() {
    if (currentStudentPage > 1) { currentStudentPage--; displayStudentBook(); }
    else showToast('أنت في الصفحة الأولى');
}

function studentBookNext() {
    if (currentStudentPage < totalPages) { currentStudentPage++; displayStudentBook(); }
    else showToast('أنت في الصفحة الأخيرة');
}

function showSchedule() {
    const tab = document.querySelector('#studentTabs button[data-tab="student-schedule"]');
    if (tab) tab.click();
}

function showHomeworkList() {
    const tab = document.querySelector('#studentTabs button[data-tab="student-homework"]');
    if (tab) tab.click();
}

function updateHomeworkList() {
    const container = document.getElementById('homeworkList');
    if (!container) return;
    const savedHomework = JSON.parse(localStorage.getItem('homeworkList')) || [];
    if (savedHomework.length === 0) { container.innerHTML = '<p class="text-muted">لا توجد واجبات حالياً</p>'; return; }
    container.innerHTML = savedHomework.map(h => `
        <div class="homework-item">
            <div><strong>${h.text}</strong></div>
            <div>التسليم: ${h.due}</div>
            ${!h.solved ? `<button class="btn btn-primary btn-sm" onclick="solveHomework(${h.id})">حل الواجب</button>` : '<span class="correct-badge">✓ تم الحل</span>'}
        </div>
    `).join('');
}

function solveHomework(id) {
    const savedHomework = JSON.parse(localStorage.getItem('homeworkList')) || [];
    const homework = savedHomework.find(h => h.id === id);
    if (homework) {
        const solution = prompt(`حل الواجب: ${homework.text}\n\nاكتب حلك:`);
        if (solution) {
            homework.solved = true;
            homework.solution = solution;
            localStorage.setItem('homeworkList', JSON.stringify(savedHomework));
            updateHomeworkList();
            showToast('✅ تم تسليم الواجب بنجاح');
        }
    }
}

function updateAnnouncements() {
    const container = document.getElementById('announcementsBox');
    if (!container) return;
    if (announcements.length === 0) { container.innerHTML = '<p class="text-muted">لا توجد إعلانات جديدة</p>'; return; }
    container.innerHTML = announcements.map(a => `<div class="announcement">📢 ${a.text} - <small>${a.date}</small></div>`).join('');
}

// ========== الألعاب ==========
function startMemoryGame() {
    const gameArea = document.getElementById('gameArea');
    if (!gameArea) return;
    const icons = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    const cards = [...icons, ...icons].sort(() => Math.random() - 0.5);
    let flipped = [];
    let matched = [];
    
    gameArea.innerHTML = `<div class="memory-grid" id="memoryGrid"></div><button class="btn btn-secondary" onclick="startMemoryGame()">خلط البطاقات</button>`;
    const grid = document.getElementById('memoryGrid');
    cards.forEach((icon, i) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = i;
        card.dataset.icon = icon;
        card.innerHTML = '?';
        card.onclick = () => {
            if (flipped.length === 2 || matched.includes(i)) return;
            card.innerHTML = icon;
            card.classList.add('flipped');
            flipped.push(i);
            if (flipped.length === 2) {
                const card1 = cards[flipped[0]];
                const card2 = cards[flipped[1]];
                if (card1 === card2) {
                    matched.push(flipped[0], flipped[1]);
                    setTimeout(() => {
                        document.querySelectorAll('.memory-card').forEach((c, idx) => {
                            if (matched.includes(idx)) c.style.opacity = '0.5';
                        });
                    }, 500);
                    flipped = [];
                    if (matched.length === cards.length) showToast('🎉 رائع! لقد أكملت اللعبة!');
                } else {
                    setTimeout(() => {
                        document.querySelectorAll('.memory-card').forEach((c, idx) => {
                            if (!matched.includes(idx)) { c.innerHTML = '?'; c.classList.remove('flipped'); }
                        });
                        flipped = [];
                    }, 1000);
                }
            }
        };
        grid.appendChild(card);
    });
}

function startMathGame() {
    const gameArea = document.getElementById('gameArea');
    if (!gameArea) return;
    let score = 0;
    let currentQuestion = null;
    
    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const ops = ['+', '-', '×'];
        const op = ops[Math.floor(Math.random() * 3)];
        let answer;
        if (op === '+') answer = num1 + num2;
        else if (op === '-') answer = num1 - num2;
        else answer = num1 * num2;
        currentQuestion = { text: `${num1} ${op} ${num2}`, answer };
        gameArea.innerHTML = `<div class="math-question">${currentQuestion.text} = ?</div><div class="math-options" id="mathOptions"></div><div>النتيجة: ${score}</div>`;
        const optionsDiv = document.getElementById('mathOptions');
        const correct = currentQuestion.answer;
        const wrong1 = correct + (Math.floor(Math.random() * 5) + 1);
        const wrong2 = correct - (Math.floor(Math.random() * 5) + 1);
        const options = [correct, wrong1, wrong2].sort(() => Math.random() - 0.5);
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'math-option';
            btn.textContent = opt;
            btn.onclick = () => {
                if (opt === correct) { score++; showToast('✅ إجابة صحيحة!'); }
                else { showToast('❌ إجابة خاطئة'); }
                generateQuestion();
            };
            optionsDiv.appendChild(btn);
        });
    }
    generateQuestion();
}

function startPuzzleGame() {
    const gameArea = document.getElementById('gameArea');
    if (!gameArea) return;
    const puzzles = [
        { question: 'ما هو عكس كلمة "طويل"؟', answer: 'قصير' },
        { question: 'ما هو جمع كلمة "كتاب"؟', answer: 'كتب' },
        { question: 'ما هو الشيء الذي يمشي بلا أرجل؟', answer: 'الوقت' },
        { question: 'ما هو لون التفاح الأحمر؟', answer: 'أحمر' }
    ];
    const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    gameArea.innerHTML = `<div class="math-question">${puzzle.question}</div><input type="text" id="puzzleAnswer" class="form-input" placeholder="اكتب إجابتك"><button class="btn btn-primary" onclick="checkPuzzle('${puzzle.answer}')">تحقق</button>`;
}

function checkPuzzle(correctAnswer) {
    const answer = document.getElementById('puzzleAnswer');
    if (answer && answer.value.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        showToast('✅ إجابة صحيحة! أحسنت');
        startPuzzleGame();
    } else showToast('❌ إجابة خاطئة، حاول مرة أخرى', true);
}

function startFocusGame() {
    const gameArea = document.getElementById('gameArea');
    if (!gameArea) return;
    let score = 0;
    gameArea.innerHTML = `<div class="focus-game"><div class="focus-target" id="focusTarget"></div><div>النتيجة: <span id="focusScore">0</span></div><button class="btn btn-secondary" onclick="startFocusGame()">إعادة</button></div>`;
    const target = document.getElementById('focusTarget');
    let timeout;
    function moveTarget() {
        const maxX = gameArea.clientWidth - 100;
        const maxY = gameArea.clientHeight - 100;
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;
        if (target) { target.style.position = 'relative'; target.style.left = `${x}px`; target.style.top = `${y}px`; }
        timeout = setTimeout(moveTarget, 1000);
    }
    if (target) target.onclick = () => { score++; document.getElementById('focusScore').textContent = score; };
    moveTarget();
}

function startWordGame() {
    const gameArea = document.getElementById('gameArea');
    if (!gameArea) return;
    const words = ['قلم', 'كتاب', 'مدرسة', 'معلم', 'طالب', 'علم', 'نجاح'];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const shuffled = randomWord.split('').sort(() => Math.random() - 0.5).join('');
    gameArea.innerHTML = `<div class="math-question">رتب الكلمة: ${shuffled}</div><input type="text" id="wordAnswer" class="form-input" placeholder="اكتب الكلمة مرتبة"><button class="btn btn-primary" onclick="checkWord('${randomWord}')">تحقق</button>`;
}

function checkWord(correctWord) {
    const answer = document.getElementById('wordAnswer');
    if (answer && answer.value.trim() === correctWord) { showToast('✅ إجابة صحيحة!'); startWordGame(); }
    else showToast('❌ إجابة خاطئة', true);
}

function startSpeedGame() {
    const gameArea = document.getElementById('gameArea');
    if (!gameArea) return;
    let timeLeft = 10;
    let score = 0;
    gameArea.innerHTML = `<div class="focus-game"><div>الوقت: <span id="timer">10</span></div><div>النتيجة: <span id="speedScore">0</span></div><button id="speedButton" class="btn btn-primary" style="width:200px; height:200px; font-size:2rem; margin:20px auto;">اضغط هنا</button><button class="btn btn-secondary" onclick="startSpeedGame()">إعادة</button></div>`;
    const button = document.getElementById('speedButton');
    const timerSpan = document.getElementById('timer');
    const scoreSpan = document.getElementById('speedScore');
    const interval = setInterval(() => { timeLeft--; if (timerSpan) timerSpan.textContent = timeLeft; if (timeLeft <= 0) { clearInterval(interval); if (button) button.disabled = true; showToast(`⏰ انتهى الوقت! نتيجتك: ${score}`); } }, 1000);
    if (button) button.onclick = () => { score++; if (scoreSpan) scoreSpan.textContent = score; };
}

// ========== AI ==========
function askAI() {
    const question = document.getElementById('aiQuestion');
    if (!question || !question.value.trim()) { showToast('⚠️ يرجى كتابة سؤال أولاً', true); return; }
    const responseDiv = document.getElementById('aiResponse');
    if (responseDiv) {
        responseDiv.innerHTML = '<div class="ai-loading"><i class="fas fa-spinner fa-spin"></i> جاري تحليل السؤال...</div>';
        setTimeout(() => {
            const answers = {
                default: 'شكراً لسؤالك! هذا سؤال مهم. الإجابة تعتمد على فهم عميق للموضوع. أنصحك بالرجوع إلى المصادر الموثوقة للحصول على إجابة دقيقة ومفصلة.',
                math: 'عملية حسابية بسيطة. تذكر أن الرياضيات تعتمد على القواعد الأساسية مثل الجمع والطرح والضرب والقسمة.',
                arabic: 'اللغة العربية غنية بالمفردات والمعاني. الإجابة تعتمد على سياق السؤال وقواعد النحو والصرف.',
                science: 'العلوم تفسر الظواهر الطبيعية. هذا السؤال يتطلب فهماً للمنهج العلمي والتجارب العملية.'
            };
            let response = answers.default;
            if (question.value.includes('رياضيات') || question.value.includes('جمع') || question.value.includes('طرح')) response = answers.math;
            else if (question.value.includes('عربي') || question.value.includes('لغة')) response = answers.arabic;
            else if (question.value.includes('علم') || question.value.includes('طبيعة')) response = answers.science;
            responseDiv.innerHTML = `<div class="ai-response-content"><i class="fas fa-robot"></i> <strong>AI:</strong><br>${response}</div>`;
        }, 1500);
    }
}

function generateExamWithAI() {
    showToast('🤖 جاري توليد اختبار بالذكاء الاصطناعي...');
    setTimeout(() => {
        const examTitle = document.getElementById('examTitle');
        if (examTitle) examTitle.value = 'اختبار من AI - ' + new Date().toLocaleDateString('ar-EG');
        currentExamQuestions = [
            { id: Date.now(), text: 'ما هو مفهوم الجاذبية الأرضية؟', type: 'essay', options: [], correctAnswer: 'الجاذبية هي قوة جذب الأجسام نحو الأرض' },
            { id: Date.now()+1, text: '2 + 2 = ؟', type: 'mcq', options: ['3', '4', '5'], correctAnswer: '4' },
            { id: Date.now()+2, text: 'الأرض مسطحة', type: 'truefalse', options: [], correctAnswer: 'خطأ' }
        ];
        updateExamQuestionsList();
        showToast('✅ تم توليد اختبار تجريبي بالذكاء الاصطناعي');
    }, 2000);
}

function analyzeClassWithAI() {
    showToast('📊 جاري تحليل أداء الفصل...');
    setTimeout(() => {
        const responseDiv = document.getElementById('aiResponse');
        if (responseDiv) responseDiv.innerHTML = `<div class="ai-response-content"><i class="fas fa-chart-line"></i> <strong>تحليل الفصل:</strong><br>مستوى التفاعل: 87%<br>نسبة الإجابات الصحيحة: 76%<br>الطلاب المتميزون: 8 طلاب<br>نقاط الضعف: الأسئلة المقالية<br>الاقتراح: زيادة الأنشطة الجماعية</div>`;
    }, 2000);
}

// ========== الإعدادات ==========
function changeTeacherColor() {
    const color = document.getElementById('teacherColor').value;
    document.documentElement.style.setProperty('--teacher-primary', color);
    localStorage.setItem('teacherColor', color);
}

function changeStudentColor() {
    const color = document.getElementById('studentColor').value;
    document.documentElement.style.setProperty('--student-primary', color);
    localStorage.setItem('studentColor', color);
}

function changeFontSize() {
    const size = document.getElementById('fontSize').value;
    document.body.className = document.body.className.replace(/font-\w+/, '');
    document.body.classList.add(`font-${size}`);
    localStorage.setItem('fontSize', size);
}

function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i><span>الوضع الفاتح</span>' : '<i class="fas fa-moon"></i><span>الوضع المظلم</span>';
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

function loadSettings() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') document.body.classList.add('dark-mode');
    const teacherColor = localStorage.getItem('teacherColor');
    if (teacherColor) document.documentElement.style.setProperty('--teacher-primary', teacherColor);
    const studentColor = localStorage.getItem('studentColor');
    if (studentColor) document.documentElement.style.setProperty('--student-primary', studentColor);
    const fontSize = localStorage.getItem('fontSize');
    if (fontSize) document.body.classList.add(`font-${fontSize}`);
    const highContrast = localStorage.getItem('highContrast');
    if (highContrast === 'true') document.body.classList.add('high-contrast');
}

// ========== نافذة السؤال ==========
function submitModalAnswer() {
    if (selectedModalAnswer) { showToast(`✅ تم إرسال إجابتك: ${selectedModalAnswer}`); closeModal(); }
    else showToast('⚠️ يرجى اختيار إجابة أولاً', true);
}

function closeModal() {
    document.getElementById('questionModal').style.display = 'none';
    selectedModalAnswer = null;
}

// ========== التبويبات ==========
function initTabs() {
    document.querySelectorAll('.nav-tabs').forEach(tabsContainer => {
        const isTeacher = tabsContainer.id === 'teacherTabs';
        tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                tabsContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const tabId = btn.dataset.tab;
                const parent = isTeacher ? '.teacher-panel' : '.student-panel';
                document.querySelectorAll(`${parent} .tab-content`).forEach(content => content.classList.remove('active'));
                const activeTab = document.getElementById(tabId);
                if (activeTab) activeTab.classList.add('active');
            });
        });
    });
}

// ========== التهيئة ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Education With Rakeez - تم تحميل جميع الوظائف');
    loadSettings();
    initTabs();
    updateScheduleDisplay();
    updateCurrentLesson();
    updateHomeworkList();
    updateAnnouncements();
    updateStudentExamsList();
    updatePreviousExamsList();
    updateGradesHistory();
    displayTeacherBook();
    displayStudentBook();
    setInterval(updateCurrentLesson, 60000);
    setInterval(() => {
        const steps = document.getElementById('stepsCount');
        if (steps) steps.textContent = (parseInt(steps.textContent.replace(/,/g, '')) + Math.floor(Math.random() * 20)).toLocaleString();
    }, 30000);
    showToast('✨ مرحباً بك في منصة Education With Rakeez ');
});
