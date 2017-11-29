#include <QCoreApplication>
#include <QDebug>
#include <QNetworkAccessManager>
#include <QNetworkRequest>
#include <QNetworkReply>
#include <QUrl>
#include <QUrlQuery>
#include <QTextStream>
 
void sendRequest();

void sendRequest(){
    QEventLoop eventLoop;
    QNetworkAccessManager mgr;
    QObject::connect(&mgr, SIGNAL(finished(QNetworkReply*)), &eventLoop, SLOT(quit()));
    
    QNetworkRequest req( QUrl( QString("http://frokz.com/cgi/changepos.cgi?p1x=11&p1y=22&p2x=33&p2y=44") ) );
    QNetworkReply *reply = mgr.get(req);
    eventLoop.exec(); 
 
    if (reply->error() == QNetworkReply::NoError) {
        QTextStream(stdout) << "Success: " << reply->readAll();
        delete reply;
    }
    else {
        QTextStream(stdout) << "Failure" << reply->errorString();
        delete reply;
    }
}
int main(int argc, char *argv[])
{
    QCoreApplication a(argc, argv);
    sendRequest();
    return a.exec();
}
 

