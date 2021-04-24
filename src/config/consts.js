export default {
  CANVAS_MAX_SIZE: 480,
  CELL_NUM: {
    SMALL: {
      VALUE: 36,
      TEXT: 'ちいさい',
    },
    MEDIUM: {
      VALUE: 24,
      TEXT: 'ふつう',
    },
    LARGE: {
      VALUE: 12,
      TEXT: 'おおきい',
    },
  },
  EDITOR_FORM: {
    title: {
      value: '',
      message: '',
    },
    description: {
      value: '',
      message: '',
    },
  },
  EDITOR_FORM_VALIDATION_MSG: {
    TITLE: {
      MAX: {
        VALUE: 20,
        TEXT: '20文字以内にしてください',
      },
      REQUIRED: {
        TEXT: 'タイトルは必須入力です',
      },
    },
    DESCRIPTION: {
      MAX: {
        VALUE: 100,
        TEXT: '100文字以内にしてください',
      },
    },
  },
  EDITOR_SLIDER_DEFAULT_VALUE: {
    R: {
      INDEX: 0,
      VALUE: 20,
    },
    G: {
      INDEX: 1,
      VALUE: 20,
    },
    B: {
      INDEX: 2,
      VALUE: 20,
    },
  },
}
