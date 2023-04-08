lexer grammar VisulaLexer;

/// Keywords
AT: '@';
MODEL: 'model';
BOOLEAN_TYPE: 'Boolean';
STRING_TYPE: 'String';
INT_TYPE: 'Int';
TEXT_TYPE: 'Text';
RICH_TEXT_TYPE: 'RichText';
DATE_TIME_TYPE: 'DateTime';
MEDIA_TYPE: 'Media';
RELATION_TYPE: 'Relation';

VALIDATION_REQUIRED_MARK: '!';

LITERAL: ( BOOLEAN_LITERAL | STRING_LITERAL);
BOOLEAN_LITERAL: 'true' | 'false';
DECIMAL_LITERAL: DECIMAL_INTEGER_LITERAL* '.' DECIMAL_DIGIT*;

STRING_LITERAL: ('"' .*? '"' | '\'' .*? '\'');

IDENTIFIER: [a-zA-Z_]+;

/// Comments
SINGLE_LINE_COMMENT:
	'#' ~[\r\n\u2028\u2029]* -> channel(HIDDEN);
MULTI_LINE_COMMENT: '/*' .*? '*/' -> channel(HIDDEN);

DECIMAL_INTEGER_LITERAL: '0' | [1-9] DECIMAL_DIGIT*;
DECIMAL_DIGIT: [0-9];

/// Brackets
PAREN_OPEN: '(';
PAREN_CLOSE: ')';
BRACE_OPEN: '{';
BRACE_CLOSE: '}';

// EOS       : ';';

SEMI: ';';

/// Whitespace
WS: [ \t\n\r\f] -> skip;
