function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 75077;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 75077 > /dev/null;
done;

for child in $(list_child_processes 75103);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/casperpilgaard/Desktop/test/bin/Debug/net7.0/c5e0a14e4fa341eaa49f9df348567324.sh;
