parser grammar VisulaParser;

options {
	tokenVocab = VisulaLexer;
	language = JavaScript;
}

program: modelBlock* EOF;

modelBlock:
	MODEL WS? IDENTIFIER WS* BRACE_OPEN WS* fieldStatement* BRACE_CLOSE;

fieldStatement:
	IDENTIFIER VALIDATION_REQUIRED_MARK? WS* dataType WS* SEMI;

dataType:
	AT (
		BOOLEAN_TYPE
		| STRING_TYPE
		| INT_TYPE
		| TEXT_TYPE
		| RICH_TEXT_TYPE
		| MEDIA_TYPE
		| RELATION_TYPE
	) WS* PAREN_OPEN WS* LITERAL WS* PAREN_CLOSE WS*;
